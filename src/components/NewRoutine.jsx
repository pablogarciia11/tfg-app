import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Moment from 'moment'
import '../styles/NewRoutine.css'

const NewRoutine = ({ API_URL, onShow, routine, setRoutine, sessions, weekDays, setWeekDays, customers, edit }) => {
  const emptyWeekDays = [
    {
      name: 'Lunes',
      day: 0,
      sessionId: ''
    }, 
    {
      name: 'Martes',
      day: 1,
      sessionId: ''
    }, 
    {
      name: 'Miércoles',
      day: 2,
      sessionId: ''
    },  
    {
      name: 'Jueves',
      day: 3,
      sessionId: ''
    },  
    {
      name: 'Viernes',
      day: 4,
      sessionId: ''
    },  
    {
      name: 'Sábado',
      day: 5,
      sessionId: ''
    },  
    {
      name: 'Domingo',
      day: 6,
      sessionId: ''
    } 
  ]

  const [exercisesSessions, setExercisesSessions] = useState([])
  const [sessionsRoutines, setSessionsRoutines] = useState([])

  const emptyRoutine = {
    name: '',
    description: '',
    length: '',
    startDate: '',
    endDate: '',
    completed: false,
    userId: '',
    createdBy: localStorage.getItem('id')
  }

  const getSessionsRoutines = async () => {
    await fetch(`${API_URL}/sessionsRoutines`)
          .then(res => res.json())
          .then(data => setSessionsRoutines(data))
  }

  const getExercisesSessions = async () => {
    await fetch(`${API_URL}/exercisesSessions`)
          .then(res => res.json())
          .then(data => setExercisesSessions(data))
  }

  const handleRoutine = (key, value) => {
    let updated = {...routine}
    updated[key] = value

    setRoutine(updated)
  }

  const handleWeekDays = (value, i) => {
    let updated = [...weekDays]
    updated[i].sessionId = value

    setWeekDays(updated)
  }

  const handleExercise = (value, i) => {
    let updated = [...exercisesSessions]
    updated[i].sessionRoutineId = value

    setExercisesSessions(updated)
  }

  const addRoutine = async () => {
    await fetch(`${API_URL}/routines`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(routine)
    })
    .then(res => 
      res.json())
    .then(data => {
      createSessionsRoutines(data.id)
    })
  }

  const updateRoutine = async () => {
    await fetch(`${API_URL}/routines/${routine.id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(routine)
    })
    .then(res => 
      res.json())
    .then(data => {
      createSessionsRoutines(data.id)
    })
  }

  const createSessionsRoutines = (routineId) => {
    let toUpdate = []
    let toCreate = []
    for(let i=0; i<routine.length; i++) {
      weekDays.forEach(day => {
        if(day.sessionId !== '') {
          let order = day.day + (7*i)
          let startDate = routine.startDate == '' ? '' : new Date(routine.startDate)
          let sessionDate = startDate == '' ? '' : new Date()
          let format = ''
          if(sessionDate != '') {
            sessionDate.setDate(startDate.getDate() + order)
            format = Moment(sessionDate).format('YYYY-MM-DD')
          }

          let sr = {
            weekDay: day.name,
            day: order,
            date: format,
            completed: false,
            sessionId: day.sessionId,
            routineId: routineId
          }

          let update = false
          sessionsRoutines.forEach(s => {
            if(s.routineId == sr.routineId && s.weekDay == sr.weekDay) {
              //if(s.sessionId != sr.sessionId) {
                sr.id = s.id
                update = true
              //}
            }
          })

          if(update) {
            toUpdate.push(sr)
          } else {
            toCreate.push(sr)
          }
        } else {
          sessionsRoutines.map(s => {
            if(s.routineId == routineId && s.weekDay == day.name) {
              fetch(`${API_URL}/sessionsRoutines/${s.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-type' : 'application/json'
                },
                body: JSON.stringify(s)
              })
            }
          })
        }
      })
    }

    updateSessionsRoutines(toUpdate)
    addSessionsRoutines(toCreate)
  }

  const addSessionsRoutines = async (sessionsRoutines) => {
    let updated = []
    sessionsRoutines.forEach(sr => {
      fetch(`${API_URL}/sessionsRoutines`, {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(sr)
      })
      .then(res => res.json())
      .then(data => {return updated.push(data)})
    })

    setTimeout(() => {
      let toUpdate = []
      updated.map(u => {
        exercisesSessions.map((e, i) => {
          if(e.sessionId == u.sessionId) {
            //handleExercise(u.id, i)
            let es = {...e}
            toUpdate.push(es)
          }
        })
      })

      toUpdate.forEach(es => {
        es.id = null
        es.sessionId = null
        es.observations = null

        fetch(`${API_URL}/exercisesSessions`, {
          method: 'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(es)
        })
      })
      
      setRoutine(emptyRoutine)
      setWeekDays(emptyWeekDays)
      setTimeout(onShow(), 1000)
    }, 1000)
  }

  const updateSessionsRoutines = async (sessionsRoutines) => {
    sessionsRoutines.forEach(sr => {
      fetch(`${API_URL}/sessionsRoutines/${sr.id}`, {
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(sr)
      })

      let toUpdate = []
      exercisesSessions.forEach(e => {
        if(e.sessionRoutineId == sr.id) {
          fetch(`${API_URL}/exercisesSessions/${e.id}`, {
            method: 'DELETE',
            headers: {
              'Content-type' : 'application/json'
            },
            body: JSON.stringify(e)
          })
        }
      })

      exercisesSessions.forEach(e => {
        if(e.sessionId == sr.sessionId) {
          let es = {...e}
          es.id = null
          es.sessionId = null
          es.observations = null
          console.log(sr.id)
          es.sessionRoutineId = sr.id
          toUpdate.push(es)
        }
      })

      toUpdate.forEach(es => {
        fetch(`${API_URL}/exercisesSessions`, {
          method: 'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(es)
        })
      })
    })
      
    setRoutine(emptyRoutine)
    setWeekDays(emptyWeekDays)
    setTimeout(onShow(), 1000)
  }
  
  const onSubmit = (e) => {
    e.preventDefault()

    let lastDay = 0
    weekDays.map(wd => lastDay = wd.day)
    let length = lastDay * routine.length
    let endDate = new Date()
    endDate.setDate(routine.startDate + length)
    let format = Moment(endDate).format('YYYY-MM-DD')

    handleRoutine('endDate', format)

    if(edit) {
      updateRoutine()
    } else {
      addRoutine()
    }
  }  

  useEffect(() => {
    getSessionsRoutines()
    getExercisesSessions()
    console.log('pide')
  }, [API_URL])

  return (
    <div className='ru-form-container'>
      <form onSubmit={onSubmit}>
        <div className='ru-form'>
          <div className="info-section">
            <div className='column'>
              <div className="left-column">
                <input 
                  type='text'
                  size='26'
                  required={true}
                  placeholder='Nombre'
                  value={routine.name}
                  onChange={(e) => handleRoutine('name', e.target.value)}
                />

                <textarea
                  className='description-field'
                  placeholder='Descripción'
                  type='text'
                  value={routine.description == null ? '' : routine.description}
                  onChange={(e) => handleRoutine('description', e.target.value)}
                />

                <select required value={routine.length} onChange={(e) => handleRoutine('length', e.target.value)} >
                  <option value='' disabled>Duración</option>
                  <option value={1}>1 semana</option>
                  <option value={2}>2 semanas</option>
                  <option value={3}>3 semanas</option>
                  <option value={0}>1 mes</option>
                  <option value={-1}>1 trimestre</option>
                </select>

                <div>
                  <label>Fecha de inicio:</label>
                  <input 
                    type='date' 
                    value={routine.startDate == null ? '' : routine.startDate}
                    onChange={(e) => handleRoutine('startDate', e.target.value)}
                  />
                </div>

                <div>
                  <label>Asignar:</label>
                  <br />
                  <select value={routine.userId == null ? '' : routine.userId} onChange={(e) => handleRoutine('userId', e.target.value)} >
                    <option value='' disabled>Seleccione</option>
                    {customers.map(c => {
                      return <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className='sessions'>
              <h4>Sesiones</h4>

              {weekDays?.map((day, i) => {
                return (
                  <div key={i} className='day-session'>
                    <label>{day.name}</label>

                    <select value={day.sessionId} onChange={(e) => handleWeekDays(e.target.value, i)}>
                      <option value=''>-</option>
                      {sessions?.map(session => {
                        return (
                          <option key={session.id} value={session.id}>{session.name}</option>
                        )
                      })}
                    </select>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className='submit-button'>
            <input
              type='submit'
              value='Guardar'
            />
          </div> 
        </div>
      </form>
    </div>
  )
}

export default NewRoutine