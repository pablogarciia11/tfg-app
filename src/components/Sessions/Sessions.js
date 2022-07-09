import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import Header from '../Header'
import './Sessions.css'

function Sessions({ fetchData }) {
  const [sessions, setSessions] = useState([])
  const [buttonPopup, setButtonPopup] = useState(false)

  useEffect(() => {
    const getSessions = async () => {
      const sessionsFromServer =  await fetchData('sessions')
      setSessions(sessionsFromServer)
    }

    getSessions()
  }, [fetchData])

  const deleteSession = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/sessions/${id}`, {
      method: 'DELETE'
    })

    setSessions(sessions.filter((session) => session.id !== id))
  }

  return (
    <>
      <Header title='Sesiones' path='new-session'/>
      <div className='sessions'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td className='left-align'>
                  <Link to={`/session/${session.id}`} className='link'>
                    {session.name}
                  </Link>
                </td>
                <td className='muscles-col'>
                  {sessions.description}
                </td>
                <td className='delete'>
                  <i className="bi bi-trash-fill" onClick={() => setButtonPopup(true)} ></i>
                  <Popup trigger={buttonPopup}></Popup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Sessions