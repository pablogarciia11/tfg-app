import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import Header from '../Header'
import './Routines.css'

function Routines({ routines, onDelete }) {
  const [buttonPopup, setButtonPopup] = useState(false)

  return (
    <>
      <Header title='Rutinas' path='routines' />
      <div className='routines'>
        <table>
          <thead>
            <tr>
              <th className='title'>Nombre</th>
              <th>Objetivo</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {routines.map((routine) => (
              <tr key={routine.id}>
                <td className='left-align'>
                  <Link to={`/routines/${routine.id}`} className='link'>
                    {routine.name}
                  </Link>
                </td>
                <td>{routine.objective}</td>
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

export default Routines