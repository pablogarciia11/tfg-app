import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = ({setUserId}) => {
  const [showMenu, setShowMenu] = useState(false)
  const logOut = () => {
    localStorage.clear()
    setUserId('')
  }
  return (
    <div className='navbar'>
      {showMenu ? (
        <>
          <div className='navbar-menu-hidden'>
            <svg onClick={() => setShowMenu(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </div>

          <div className='navbar-elements'>
            {localStorage.getItem('role') != 'customer' ? (
              <>
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
                  <Link to='/customers' className='top-link'>
                    Clientes
                  </Link>
                </h2>
              </>
            ) : (<></>)}
            <h2>
              <Link to={`/profile/${localStorage.getItem('id')}`} className='top-link'>
                Perfil
              </Link>
            </h2>
            {localStorage.getItem('id') !== null ? (
              <h2 onClick={() => logOut()} className='top-link' >
                Cerrar sesión
              </h2>
            ) : (<></>)}
          </div>
        </>
      ) : (
        <div className='navbar-menu-hidden'>
          <svg onClick={() => setShowMenu(true)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </div>
      )}

      <div className='home-center'>
        <Link to='/' className='top-link'>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-house-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
            <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Navbar