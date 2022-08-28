import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NewRoutine from './NewRoutine'
import Popup from './Popup'

const Routines = ({API_URL}) => {
  const [routines, setRoutines] = useState([])
  const [sessions, setSessions] = useState([])
  const [customers, setCustomers] = useState([])
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)
  const [buttonPopup, setButtonPopup] = useState({
    isLoading: false,
    record: {}
  })

  const [emptyRoutine, setEmptyRoutine] = useState(
    {
      name: '',
      description: '',
      length: '',
      startDate: '',
      endDate: '',
      completed: false,
      userId: '',
      createdBy: localStorage.getItem('id')
    }
  )

  const [editRoutine, setEditRoutine] = useState({})
  const [sessionsRoutine, setSessionsRoutine] = useState({})
  const [editWeekDays, setEditWeekDays] = useState([])

  const [emptyWeekDays, setEmptyWeekDays] = useState([
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
  ])

  const getRoutines = async (name) => {
    await fetch(`${API_URL}/routines/${name}`)
    .then(res => res.json())
    .then(data => {
      let filtered = []
      if(localStorage.getItem('role') == 'trainer') {
        filtered = data.filter(r => r.createdBy == localStorage.getItem('id'))
      } else if(localStorage.getItem('role') == 'customer') {
        filtered = data.filter(r => r.userId == localStorage.getItem('id'))
      } else {
        filtered = [...data]
      }
      setRoutines(filtered)

      let updated = {...sessionsRoutine}
      filtered.map(routine => {
        fetch(`${API_URL}/sessionsRoutines/${routine.id}`)
        .then(res => res.json())

        .then(data => {
          updated[routine.id] = data

          setSessionsRoutine(updated)
        })
      })
    })
  }

  const onShow = () => {
    let updated = [...emptyWeekDays]
    setEditWeekDays(updated)

    setShow(!show)
    if(edit) {
      setEdit(false)
    }
  }

  const handleChange = (search) => {
    getRoutines(search)
  }

  const handleWeekDays = (ssRR) => {
    let update = []
    for (let i = 0; i < emptyWeekDays.length; i++) {
      let weekDay = {...emptyWeekDays[i]}
      update.push(weekDay)

      ssRR.forEach(sr => {
        if(emptyWeekDays[i].day == sr.day) {
          update[i].sessionId = sr.sessionId
        }
      })
    }

    setEditWeekDays(update)
    
    setTimeout(() => {
      setEdit(true)
      setShow(true)
    }, 1000);
    
  }

  const handleEdit = (routine) => {
    let sr = sessionsRoutine[routine.id]
    handleWeekDays(sr)

    setEditRoutine(routine)
  }

  const handleDelete = (routine) => {
    setButtonPopup({
      isLoading: true,
      record: routine
    })
  }

  useEffect(() => {
    const getSessions = async () => {
      await fetch(`${API_URL}/sessions`)
      .then(res => res.json())
      .then(data => {
        if(localStorage.getItem('role') == 'trainer') {
          let filtered = data.filter(s => s.createdBy == localStorage.getItem('id'))
          setSessions(filtered)
        } else {
          setSessions(data)
        }
      })
    }
  
    const getCustomers = async () => {
      await fetch(`${API_URL}/users`)
            .then(res => res.json())
            .then(data => {
              if(localStorage.getItem('role') == 'trainer') {
                let filtered = data.filter(s => s.trainer == localStorage.getItem('id'))
                setCustomers(filtered)
              } else {
                setCustomers(data)
              }
            })
    }
    
    getRoutines('')
    getSessions()
    getCustomers()
  }, [API_URL, show])

  return (
    <div className='page-body'>
      <h1>{show ? 'Nueva rutina' : 'Rutinas'}</h1>

      <button onClick={() => onShow()}>
        {show ? 'Cancelar' : 'Crear rutina'}
      </button>

      <br />

      {buttonPopup.isLoading ? (
        <Popup API_URL={API_URL} trigger={buttonPopup} setTrigger={setButtonPopup} type={'rutina'} />
      ) : (
        <></>
      )}

      {show ? (
        <>
          <NewRoutine
            API_URL={API_URL} 
            onShow={onShow} 
            routine={edit ? editRoutine : emptyRoutine}
            setRoutine={edit ? setEditRoutine : setEmptyRoutine}
            sessions={sessions}
            weekDays={edit ? editWeekDays : emptyWeekDays}
            setWeekDays={edit ? setEditWeekDays : setEmptyWeekDays}
            customers={customers}
            edit={edit}
          />
        </>
      ) : (
        <>
          <div className='search'>
            <input
              className='search-box'
              size='31'
              placeholder='Busca por nombre o descripción'
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>

          {routines?.length > 0 ? (
            <Grid container rowSpacing={3} columnSpacing={0}>
                {routines.map(routine => (
                  <Grid key={routine.id} item xs={4} className='center-label'>
                    <label key={routine.id} className="adjacent" >
                      <div className="">
                        <Link to={`/routine/${routine.id}`} className='link' >
                          {routine.name}
                        </Link>
                        <span className="d-block small">
                          {routine.description} 
                        </span>
                      </div>
                      <div className='actions'>
                        <svg 
                          onClick={() => handleEdit(routine)}
                          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pencil bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        <br />
                        <svg 
                          onClick={() => handleDelete(routine)}
                          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="trash bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                      </div>
                    </label>
                  </Grid>
                ))}
            </Grid>
            ) : (
              <h1>
                No se han encontrado rutinas
              </h1>
            )
          }
        </>
      )}

    </div>
  )
}

export default Routines