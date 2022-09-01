import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/Session.css'
import SessionCompleted from './SessionCompleted'

const Session = ({ API_URL }) => {
  const params = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState({})
  const [exercisesSession, setExercisesSession] = useState([])

  const [buttonPopup, setButtonPopup] = useState({
    isLoading: false,
    record: {}
  })

  const getSession = async () => {
    await fetch(`${API_URL}/sessions`)
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
    await fetch(`${API_URL}/exercisesSessions/${params.id}`)
            .then(res => res.json())
            .then(data => setExercisesSession(data))
  }

  const handleCompleted = (session) => {
    setButtonPopup({
      isLoading: true,
      record: session
    })
  }

  const handleExercise = (i, value) => {
    let updated = [...exercisesSession]
    updated[i].observations = value

    setExercisesSession(updated)
  }

  const updateAndClose = async () => {
    await fetch(`${API_URL}/sessions/${session.id}`, {
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
    <>
      {localStorage.getItem('role') == 'admin' || 
        (localStorage.getItem('role') == 'customer' && session.userId == localStorage.getItem('id')) ||
        (localStorage.getItem('role') == 'trainer' && session.createdBy == localStorage.getItem('id')) ? (
          <div>
            {buttonPopup.isLoading ? (
              <SessionCompleted API_URL={API_URL} trigger={buttonPopup} setTrigger={setButtonPopup} setSession={setSession} />
            ) : (
              <></>
            )}

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
                        {session.userId == localStorage.getItem('id') || localStorage.getItem('role') == 'admin' ? (
                          <textarea
                            cols='45'
                            rows='2'
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
                  {session.completed ? (
                      <button className='cancel-button no-action-button'>
                        Completada
                      </button>
                  ) : (
                      <button className='create-button' onClick={() => handleCompleted(session)}>
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

export default Session