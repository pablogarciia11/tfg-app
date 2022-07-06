import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Navbar from './Navbar'

function Home() {
  return (
    <>
      <div className="container">
        <h1 className='section'>
          <Link to='/exercises'>
            Ejercicios
          </Link>
        </h1>
        <h1 className='section'>
          <Link to='/sessions'>
            Sesiones
          </Link>
        </h1>
        <h1 className='section'>
          <Link to='/routines'>
            Rutinas
          </Link>
        </h1>
        <h1 className='section'>
          <Link to='/clients'>
            Clientes
          </Link>
        </h1>
        <h1 className='section'>
          <Link to='/profile'>
            Perfil
          </Link>
        </h1>
      </div>
    </>
  )
}

export default Home