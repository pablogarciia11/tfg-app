import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/Routine.css'

const Routine = ({API_URL}) => {
  const params = useParams()
  const navigate = useNavigate()
  const [routine, setRoutine] = useState({})
  const [sessionsRoutines, setSessionsRoutines] = useState([])
  const [sessionMap, setSessionMap] = useState({})
  const weekDays = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ]

  useEffect(() => {
    const getRoutine = async () => {
      await fetch(`${API_URL}/routines`)
      .then(res => res.json())
      .then(data => {
        data.map(r => {
          if(r.id == params.id) {
            setRoutine(r)
          }
        })
      })
    }

    const getSessionsRoutines = async () => {
      fetch(`${API_URL}/sessionsRoutines/${params.id}`)
      .then(res => res.json())
      .then(data => {
        data.map(s => {
          if(s.day < 7) {
            sessionMap[s.day] = {
              id: s.sessionId,
              name: s.name
            }
          }
        })
        setSessionsRoutines(data)
      })
    }

    getRoutine()
    getSessionsRoutines()
  }, [API_URL, params.id])

  return (
    <div className='routine-container'>
      <h1>{routine.name}</h1>
      <table className='routine-detail'>
        <thead>
          <tr>
            {weekDays.map(weekDay => {
              return <th key={weekDay} className='routine-detail'>{weekDay}</th> 
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekDays.map((weekDay, index) => {
              return (
                <td className='routine-detail' key={index}> 
                  {sessionMap[index] ? (
                    <Link to={`/sessionRoutine/${sessionMap[index] ? sessionMap[index].id : ''}`}>
                      {sessionMap[index] ? sessionMap[index].name : ''}
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
          <div className='info-row'>
            <label style={{fontWeight: 'bold'}}>¿Finalizada?</label>
            {routine.completed ? (
              <svg style={{marginLeft: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
            ) : (
              <svg style={{marginLeft: '5px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            )}
          </div>
          
          <div className='info-row'>
            <label style={{fontWeight: 'bold'}}>Duración:</label>
            <label style={{marginLeft: '5px'}}>{routine.length} semanas</label>
          </div>
        </div>
      </div>

      <button onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  )
}

export default Routine