import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Register.css'

const Register = ({API_URL, setUserId}) => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    birth: '',
    role: ''
  })

  const [info, setInfo] = useState({
    weight: '',
    height: '',
    date: ''
  })

  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)

  const getUsers = async () => {
    await fetch(`${API_URL}/users`)
    .then(res => res.json())
    .then(data => setUsers(data))
  }

  const addUser = async () => {
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      fetch(`${API_URL}/informations`, {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(user)
      })


      localStorage.setItem('id', data.id)
      localStorage.setItem('role', data.role)
      setUserId(data)
      navigate('/')
    })
  }

  const handleUser = (key, value) => {
    let updated = {...user}
    updated[key] = value

    setUser(updated)
  }

  const handleInfo = (key, value) => {
    let updated = {...user}
    updated[key] = value

    setInfo(updated)
  }

  const checkUserName = () => {
    users.forEach(u => {
      if(u.userName == user.userName) {
        setUsernameError(true)
        return false
      }
    })

    return true
  }

  const checkEmail = () => {
    users.forEach(u => {
      if(u.email == user.email) {
        setEmailError(true)
        return false
      }
    })

    return true
  }

  const checkPassword = () => {
    if(user.password !== confirmPassword) {
      setPasswordError(true)
      return false
    } else {
      return true
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    setPasswordError(false)
    setUsernameError(false)
    setEmailError(false)

    if (checkUserName() && checkEmail() && checkPassword()) {
      console.log(user)
      addUser()
    }
  }

  useEffect(() => {
    getUsers()
  }, [API_URL])

  return (
    <div className='text-center'>
      <main className='re-form-container'>
        <form onSubmit={onSubmit}>
          <div className='register-form'>
            <h3>Formulario de registro</h3>

            <div className='form-row'>
              <div className='form-info'>
                <input
                  className='register-input'
                  type='text'
                  required
                  placeholder='Nombre'
                  value={user.firstName}
                  onChange={(e) => handleUser('firstName', e.target.value)}
                />
              </div>

              <div className='form-info'>
                <input
                  className='register-input'
                  type='text'
                  required
                  placeholder='Apellidos'
                  value={user.lastName}
                  onChange={(e) => handleUser('lastName', e.target.value)}
                />
              </div>
            </div>
            
            <div className='form-row'>
              <div className='form-info'>
                <input
                  className='register-input'
                  type='email'
                  required
                  placeholder='Correo electrónico'
                  value={user.email}
                  onChange={(e) => handleUser('email', e.target.value)}
                />

                {emailError ? 
                  <p className='error-control'>
                    El correo electrónico ya está en uso
                  </p>
                  : 
                  <></>
                }
              </div>

              <div className='form-info'>
                <input
                  className='register-input'
                  type='text'
                  required
                  placeholder='Nombre de usuario'
                  value={user.userName}
                  onChange={(e) => handleUser('userName', e.target.value)}
                />

                {usernameError ? 
                  <p className='error-control'>
                    El nombre de usuario ya está en uso
                  </p>
                  : 
                  <></>
                }
              </div>
            </div>

            <div className='form-row'>
              <div className='form-info'>
                <input
                  className='register-input'
                  type='password'
                  required
                  placeholder='Contraseña'
                  value={user.password}
                  onChange={(e) => handleUser('password', e.target.value)}
                />
              </div>

              <div className='form-info'>
                <input
                  className='register-input'
                  type='password'
                  required
                  placeholder='Confirmar contraseña'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
                {passwordError ? 
                  <p className='error-control'>
                    Las contraseñas no coinciden
                  </p>
                  : 
                  <></>
                }
              </div>
            </div>

            <div className='form-row'>
              <div className='date-row'>
                <label>Fecha de nacimiento</label>
                <input
                  className='register-input'
                  type='date'
                  required
                  onChange={(e) => handleUser('birth', e.target.value)}
                />
              </div>

              <div className='role-row'>
                <label>Rol</label>
                <select required value={user.role} onChange={(e) => handleUser('role', e.target.value)}>
                  <option disabled value=''>Seleccione</option>
                  <option value='customer'>Deportista</option>
                  <option value='trainer'>Entrenador</option>
                </select>
              </div>
            </div>

            <div className='form-row'>
              <div className='form-info'>
                <input
                  className='register-input'
                  type='number'
                  placeholder='Peso (kg)'
                  value={info.weight}
                  onChange={(e) => handleInfo('weight', e.target.value)}
                />
              </div>

              <div className='form-info'>
                <input
                  className='register-input'
                  type='number'
                  placeholder='Altura (cm)'
                  value={info.height}
                  onChange={(e) => handleInfo('height', e.target.value)}
                />
              </div>
            </div>

            <div className=''>
              <button type='submit' className='w-100 btn btn-lg btn-primary'>
                Registrarse
              </button>
            </div>

            <div className=''>
              <Link to='/login'>
                ¿Ya tienes cuenta?
                Iniciar sesión
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
    
  )
}

export default Register