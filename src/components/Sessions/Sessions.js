import React from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import Header from '../Header'
import DeleteRecord from '../DeleteRecord'
import './Sessions.css'

function Sessions({ sessions, onDelete }) {
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
                  <Popup 
                    trigger={<i className="bi bi-trash-fill" ></i>} position="center center">
                    <DeleteRecord type='session' title={session.name} onCancel='' onDelete={() => onDelete(session.id)}/>
                  </Popup>
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