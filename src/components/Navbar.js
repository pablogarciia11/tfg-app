import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbar-elements'>
        <h2>
          <Link to='/exercises' className='top-link'>
            Ejercicios
          </Link>
        </h2>
        <h2>
          <Link to='/sessions' className='top-link'>
            Sesiones
          </Link>
        </h2>
        <h2>
          <Link to='/routines' className='top-link'>
            Rutinas
          </Link>
        </h2>
        <h2>
          <Link to='/clients' className='top-link'>
            Clientes
          </Link>
        </h2>
        <h2>
          <Link to='/profile' className='top-link'>
            Perfil
          </Link>
        </h2>
      </div>
    </div>
  )
}

export default Navbar