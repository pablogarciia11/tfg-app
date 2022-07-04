import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header( { title, path } ) {
  return (
    <div className='header'>
      <h1>{title}</h1>
      <Link to={path}>
        <button>Crear {title === 'Sesiones' ? 'sesión' : title.toLowerCase().slice(0, -1)}</button>
      </Link>
    </div>
  )
}

export default Header