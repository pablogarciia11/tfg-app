import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/MySessions.css'

const MySessions = ({API_URL}) => {
  const [today, setToday] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [undated, setUndated] = useState([])
  const [previous, setPrevious] = useState([])
  const actualDate = new Date()

  const getSessions = async () => {
    await fetch(`${API_URL}/sessions`)
          .then(res => res.json())
          .then(data => data.filter(s => s.userId == localStorage.getItem('id')))
          .then(filtered => {
            setToday(filtered.filter(td => new Date(td.date) == actualDate))
            setUpcoming(filtered.filter(uc => new Date(uc.date) >= actualDate))
            setUndated(filtered.filter(un => un.date === null))
            setPrevious(filtered.filter((pv) => {
              return new Date(pv.date) < actualDate && pv.date !== null
            }))
          })
  }

  useEffect(() => {
    getSessions()
  }, [API_URL])

  return (
    <div className='my-sessions-container'>
      <h2>Mis sesiones</h2>

      <div>
        <h3>Hoy</h3>
        {today.length > 0 ? 
          (today.map((td) => {
            return  <div key={td.id} className='my-session-card'>
                      <div>
                        {moment(td.date).format('DD/MM/YYYY')}
                      </div>

                      <div>
                        <Link to={`/session/${td.id}`}>
                          {td.name}
                        </Link>
                      </div>

                      <div>
                        {td.completed ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{color:'white', backgroundColor:'green', borderRadius:'10px'}} className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          </svg>
                        )}
                      </div>
                    </div>
          })) : (
            <div className='my-session-card'>
              No se han encontrado registros
            </div>
          )
        }
      </div>

      <div>
        <h3>Próximas</h3>
        {upcoming.length > 0 ? 
          (upcoming.map((uc) => {
            return  <div key={uc.id} className='my-session-card'>
                      <div>
                        {moment(uc.date).format('DD/MM/YYYY')}
                      </div>

                      <div>
                        <Link to={`/session/${uc.id}`}>
                          {uc.name}
                        </Link>
                      </div>

                      <div>
                        {uc.completed ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{color:'white', backgroundColor:'green', borderRadius:'10px'}} className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          </svg>
                        )}
                      </div>
                    </div>
          })) : (
            <div className='my-session-card'>
              No se han encontrado registros
            </div>
          )
        }
      </div>

      <div>
        <h3>Sin programar</h3>
        {undated.length > 0 ? 
          (undated.map(ud => {
            return  <div key={ud.id} className='my-session-card'>
                      <div>
                        Sin fecha
                      </div>

                      <div>
                        <Link to={`/session/${ud.id}`}>
                          {ud.name}
                        </Link>
                      </div>

                      <div>
                        {ud.completed ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{color:'white', backgroundColor:'green', borderRadius:'10px'}} className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          </svg>
                        )}
                      </div>
                    </div>
            })
          ) : (
            <div className='my-session-card'>
              No se han encontrado registros
            </div>
          )
        }
      </div>

      <div>
        <h3>Anteriores</h3>
        {previous.length > 0 ?
          (previous.map(pv => {
            return  <div key={pv.id} className='my-session-card'>
                      <div>
                        {moment(pv.date).format('DD/MM/YYYY')}
                      </div>

                      <div>
                        <Link to={`/session/${pv.id}`}>
                          {pv.name}
                        </Link>
                      </div>

                      <div>
                        {pv.completed ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{color:'white', backgroundColor:'green', borderRadius:'10px'}} className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          </svg>
                        )}
                      </div>
                    </div>
            })
          ) : (
            <div className='my-session-card'>
              No se han encontrado registros
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MySessions