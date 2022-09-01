import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/MyRoutines.css'

const MyRoutines = ({API_URL}) => {
  const [ongoing, setOngoing] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [undated, setUndated] = useState([])
  const [previous, setPrevious] = useState([])
  const actualDate = new Date()

  const getRoutines = async () => {
    await fetch(`${API_URL}/routines`)
          .then(res => res.json())
          .then(data => data.filter(r => r.userId == localStorage.getItem('id')))
          .then(filtered => {
            setOngoing(filtered.filter(og => {
              return new Date(og.startDate) <= actualDate && new Date(og.endDate) >= actualDate
            }))
            setUpcoming(filtered.filter(uc => new Date(uc.startDate) >= actualDate))
            setUndated(filtered.filter(un => un.startDate === null))
            setPrevious(filtered.filter((pv) => {
              return new Date(pv.startDate) < actualDate && new Date(pv.endDate) <= actualDate
            }))
          })
  }

  useEffect(() => {
    getRoutines()
  }, [API_URL])

  return (
    <div className='my-routines-container'>
      <div className='my-title'>
        <h2>Mis rutinas</h2>
      </div>

      <div className='routines-group'>
        <h3>En curso</h3>
        {ongoing.length > 0 ? 
          (ongoing.map((og) => {
            return  <div key={og.id} className='my-routine-card'>
                      <div>
                        {moment(og.startDate).format('DD/MM/YYYY')} - {moment(og.endDate).format('DD/MM/YYYY')}:
                      </div>

                      <div>
                        <Link to={`/routine/${og.id}`}>
                          {og.name}
                        </Link>
                      </div>

                      <div>
                        {og.completed ? (
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
            <div className='my-routine-card'>
              No se han encontrado registros
            </div>
          )
        }
      </div>

      <div className='routines-group'>
        <h3>Próximas</h3>
        {upcoming.length > 0 ? 
          (upcoming.map((uc) => {
            return  <div key={uc.id} className='my-routine-card'>
                      <div>
                        {moment(uc.startDate).format('DD/MM/YYYY')} - {moment(uc.endDate).format('DD/MM/YYYY')}:
                      </div>

                      <div>
                        <Link to={`/routine/${uc.id}`}>
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
            <div className='my-routine-card'>
              No se han encontrado registros
            </div>
          )
        }
      </div>

      <div className='routines-group'>
        <h3>Sin programar</h3>
        {undated.length > 0 ? 
          (undated.map(ud => {
            return  <div key={ud.id} className='my-routine-card'>
                      <div>
                        Sin fecha
                      </div>

                      <div>
                        <Link to={`/routine/${ud.id}`}>
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
            <div className='my-routine-card'>
              No se han encontrado registros
            </div>
          )
        }
      </div>

      <div className='routines-group'>
        <h3>Anteriores</h3>
        {previous.length > 0 ?
          (previous.map(pv => {
            return  <div key={pv.id} className='my-routine-card'>
                      <div>
                        {moment(pv.startDate).format('DD/MM/YYYY')} - {moment(pv.endDate).format('DD/MM/YYYY')}:
                      </div>

                      <div>
                        <Link to={`/routine/${pv.id}`}>
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
            <div className='my-routine-card'>
              No se han encontrado registros
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MyRoutines