import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/Routine.css'
import RoutineCompleted from './RoutineCompleted'

const Routine = ({API_URL}) => {
  const params = useParams()
  const navigate = useNavigate()
  const [routine, setRoutine] = useState({})
  const [sessionsRoutines, setSessionsRoutines] = useState([])
  const [sessionMap, setSessionMap] = useState({})

  const [buttonPopup, setButtonPopup] = useState({
    isLoading: false,
    record: {}
  })

  const weekDays = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ]

  const [titles, setTitles] = useState([])

  const createTitles = (length) => {
    let updated = []
    for(let i=0; i<length; i++) {
      let week = i+1
      updated.push('Semana ' + week)
    }

    setTitles(updated)
  }

  const handleCompleted = (session) => {
    setButtonPopup({
      isLoading: true,
      record: session
    })
  }

  const updateAndClose = async () => {
    await fetch(`${API_URL}/routines/${routine.id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(routine)
    })
    .then(setTimeout(() => navigate(-1), 1000))
  }

  useEffect(() => {
    const getRoutine = async () => {
      await fetch(`${API_URL}/routines`)
      .then(res => res.json())
      .then(data => {
        data.map(r => {
          if(r.id == params.id) {
            setRoutine(r)
            createTitles(r.length)
          }
        })
      })
    }

    const getSessionsRoutines = async () => {
      fetch(`${API_URL}/sessionsRoutines/${params.id}`)
      .then(res => res.json())
      .then(data => {
        data.map(s => {
          sessionMap[s.day] = {
            id: s.id,
            name: s.name
          }
        })
        setSessionsRoutines(data)
      })
    }

    getRoutine()
    getSessionsRoutines()
  }, [API_URL, params.id])

  return (
    <>
      {localStorage.getItem('role') == 'admin' || 
        (localStorage.getItem('role') == 'customer' && routine.userId == localStorage.getItem('id')) ||
        (localStorage.getItem('role') == 'trainer' && routine.createdBy == localStorage.getItem('id')) ? (
          <div>
            {buttonPopup.isLoading ? (
              <RoutineCompleted API_URL={API_URL} trigger={buttonPopup} setTrigger={setButtonPopup} setRoutine={setRoutine} />
            ) : (
              <></>
            )}

            <div className='routine-container'>
              <h1>{routine.name}</h1>

              {titles.map((title, i) => {
                return <table key={title} className='routine-detail'>
                          <thead>
                            <tr>
                              <th colSpan={7}>{title}</th>
                            </tr>
                            <tr>
                              {weekDays.map(weekDay => {
                                return <th key={weekDay} className='routine-detail'>{weekDay}</th> 
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {weekDays.map((weekDay, index) => {
                                let value = i*7 + index
                                return (
                                  <td className='routine-detail' key={value}> 
                                    {sessionMap[value] ? (
                                      <Link to={`/sessionRoutine/${sessionMap[value] ? sessionMap[value].id : ''}`}>
                                        {sessionMap[value] ? sessionMap[value].name : ''}
                                      </Link>
                                      ) : (
                                        'Descanso'
                                      )
                                    }
                                  </td>
                                )
                              })}
                            </tr>
                          </tbody>
                        </table>
              })}

              <div className='info-card'>
                <div className='info-column'>
                  <div className='info-row'>
                    <label style={{fontWeight: 'bold'}}>Fecha de comienzo:</label>
                    <label style={{marginLeft: '5px'}}>
                      {routine.startDate == null ? (
                        'Sin programar'
                      ) : (
                        moment(new Date(routine.startDate)).format('DD/MM/YYYY')
                      )}
                    </label>
                  </div>

                  <label style={{fontWeight: 'bold'}}>Asignación: </label>
                    <label style={{marginLeft: '5px'}}>
                      {routine.userId == null ? (
                        'Sin asignar'
                      ) : (
                        routine.userName
                      )}
                    </label> 
                </div>

                <div className='info-column'>
                  {routine.completed ? (
                      <button className='cancel-button no-action-button'>
                        Completada
                      </button>
                  ) : (
                      <button className='create-button' onClick={() => handleCompleted(routine)}>
                        Marcar completada
                      </button>
                  )}
                </div>
              </div>

              <div className="session-btn-group">
                <button className='button-normal' onClick={() => navigate(-1)}>
                  Volver
                </button>

                <button className='button-confirm' onClick={() => updateAndClose()}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <button onClick={() => navigate(-1)} className='cancel-button space-top'>
              Volver
            </button>
            
            <div className='space-top'>
              <h1>Vaya... parece que te has equivocado de ruta</h1>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Routine