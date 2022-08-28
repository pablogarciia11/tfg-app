import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = ({setUserId}) => {
  const logOut = () => {
    localStorage.clear()
    setUserId('')
  }
  return (
    <div className='navbar'>
      <div className='navbar-elements'>
        {localStorage.getItem('role') != 'customer' ? (
          <h2>
            <Link to='/exercises' className='top-link'>
              Ejercicios
            </Link>
          </h2>
        ) : (<></>)}
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
        {localStorage.getItem('role') != 'customer' ? (
          <h2>
            <Link to='/clients' className='top-link'>
              Clientes
            </Link>
          </h2>
        ) : (<></>)}
        {localStorage.getItem('id') !== null ? (
          <h2 onClick={() => logOut()} className='top-link'>
            Cerrar sesión
          </h2>
        ) : (<></>)}
      </div>
    </div>
  )
}

export default Navbar