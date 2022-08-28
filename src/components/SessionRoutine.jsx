import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const SessionRoutine = ({API_URL}) => {
  const params = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState({})
  const [exercisesSession, setExercisesSession] = useState([])

  const getSession = async () => {
    await fetch(`${API_URL}/sessionsRoutines`)
            .then(res => res.json())
            .then(data => {
              data.map(s => {
                if(s.id == params.id) {
                  setSession(s)
                }
              })
            })
  }

  const getExercisesSession = async () => {
    await fetch(`${API_URL}/exercisesSessions`)
          .then(res => res.json())
          .then(data => setExercisesSession(data.filter(d => d.sessionRoutineId == params.id)))
  }

  const handleSession = () => {
    let updated = {...session}
    updated.completed = !session.completed

    setSession(updated)
  }

  const handleExercise = (i, value) => {
    let updated = [...exercisesSession]
    updated[i].observations = value

    setExercisesSession(updated)
  }

  const updateAndClose = async () => {
    await fetch(`${API_URL}/sessionsRoutines/${session.id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(session)
    })
    .then(res => 
      res.json())
    .then(data => {
      exercisesSession.map(ex => {
        fetch(`${API_URL}/exercisesSessions/${ex.id}`, {
          method: 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(ex)
        })
      })
    })
    .then(setTimeout(() => navigate(-1), 1000))
  }
  
  useEffect(() => {
    getSession()
    getExercisesSession()
  }, [API_URL, params.id])

  return (
    <div className='session-container'>
      <h1>{session.name}</h1>
      <table className='session-detail'>
        <thead>
          <tr>
            <th className='session-detail'>Ejercicio</th>
            <th className='session-detail'>Series</th>
            <th className='session-detail'>Repeticiones</th>
            <th className='session-detail'>RIR</th>
            <th className='session-detail'>Descanso</th>
            <th className='session-detail'>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {exercisesSession.map((ex, i) => (
            <tr key={ex.id}>
              <td className='large-width session-detail'>{ex.name}</td>
              <td className='session-detail'>{ex.series}</td>
              <td className='session-detail'>{ex.minReps} {ex.maxReps > 0 ? `-${ex.maxReps}` : ''}</td>
              <td className='session-detail'>{ex.RIR}</td>
              <td className='session-detail'>{`${ex.rest}"`}</td>
              <td className='large-width session-detail'>
                {session.userId == localStorage.getItem('id') ? (
                  <textarea
                    cols='45'
                    value={ex.observations == null ? '' : ex.observations}
                    onChange={(e) => handleExercise(i, e.target.value)}
                  />
                ): (
                  (ex.observations)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='info-card'>
        <div className='info-column'>
          <div className='info-row'>
            <label style={{fontWeight: 'bold'}}>Fecha:</label>
            <label style={{marginLeft: '5px'}}>
              {session.date == null ? (
                'Sin programar'
              ) : (
                moment(new Date(session.date)).format('DD/MM/YYYY')
              )}
            </label>
          </div>

          {localStorage.getItem('role') != 'customer' ? (
            <div className='info-row'>
              <label style={{fontWeight: 'bold'}}>Asignación: </label>
              <label style={{marginLeft: '5px'}}>
                {session.userId == null ? (
                  'Sin asignar'
                ) : (
                  session.userName
                )}
              </label> 
            </div>) : 
          (
            <></>
          )}
        </div>

        <div className='info-column'>
          <div className='info-row'>
            <button className='button-normal' onClick={() => handleSession()}>
              ¿Finalizada?
            </button>
            {session.completed ? (
              <svg style={{marginLeft: '5px', color:'white', backgroundColor:'green', borderRadius:'10px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
            ) : (
              <svg style={{marginLeft: '5px', color:'white', backgroundColor:'red', borderRadius:'10px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            )}
          </div>
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
  )
}

export default SessionRoutine