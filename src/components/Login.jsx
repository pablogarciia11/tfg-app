import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'

const Login = ({API_URL, setUserId}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const checkUser = async() => {
    await fetch(`${API_URL}/users/${email}`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(data => {
      if(data !== -1) {
        localStorage.setItem('id', data.id)
        localStorage.setItem('role', data.role)
        setUserId(data)
        navigate('/')
      } else {
        setTimeout(alert('Correo o contraseña incorrectos'), 1000)
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    checkUser()
  }

  return (
    <div className='text-center'>
      <main className='form-container'>
        <form onSubmit={onSubmit}>
          <div className='login-form'>
            <h1 className='h3 mb-3 fw-normal'>Inicio de sesión</h1>
            <div className='form-floating'>
              <input
                type='email'
                className='form-control'
                id='floatingInput'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="floatingInput">Correo electrónico</label>
            </div>

            <div className='form-floating'>
              <input
                type='password'
                className='form-control'
                id='floatingPassword'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="floatingPassword">Contraseña</label>
            </div>
            
            <div className=''>
              <button type='submit' className='w-100 btn btn-lg btn-primary'>
                Iniciar sesión
              </button>
            </div>

            <div className=''>
              <Link to='/sign-in'>
                ¿Aún no eres miembro?
                Registrarse
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Login