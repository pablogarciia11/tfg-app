import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'

const Header = ({placeholder, title, path, btn}) => {
  return (
    <div className='header'>
      <h1>
        {title}
      </h1>

      {btn ? (
        <Link to={path}>
          <button>
            {placeholder === 'Volver' ? placeholder : `Crear ${placeholder}`}
          </button>
        </Link>
      ) : (
        <>
        </>
      )}
    </div>
  )
}

export default Header