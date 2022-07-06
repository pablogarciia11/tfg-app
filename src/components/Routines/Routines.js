import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import './Routines.css'

function Routines({ routines, onDelete }) {
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
                <td><i className="bi bi-trash-fill" ></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Routines