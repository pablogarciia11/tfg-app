import userEvent from '@testing-library/user-event'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Profile.css'

const Profile = ({API_URL}) => {
  const params = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [newEmail, setNewEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleUser = (key, value) => {
    let updated = {...user}
    updated[key] = value

    setUser(updated)
  }

  useEffect(() => {
    const getProfile = async () => {
      await fetch(`${API_URL}/users`)
            .then(res => res.json())
            .then(data => {
              data.map(u => {
                if(u.id == localStorage.getItem('id')) {
                  setUser(u)
                }
              })
            })
    }

    getProfile()
  }, [API_URL])

  const checkEmail = () => {
    if(newEmail == confirmEmail) {
      return true
    } else {
      setEmailError(true)
      return false
    }
  }

  const checkPassword = () => {
    if(newPassword == confirmPassword) {
      return true
    } else {
      setPasswordError(true)
      return false
    }
  }

  const updateUser = async () => {
    await fetch(`${API_URL}/users/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(checkEmail() && checkPassword()) {
      updateUser()
    }
  }

  return (
    <div className='text-center'>
      <button onClick={() => navigate(-1)} className='cancel-button space-top'>
        Volver
      </button>

      {params.id == localStorage.getItem('id') ? (
        <div className='pf-form-container'>
          <h2>Perfil</h2>
          <form onSubmit={onSubmit}>
            <div className='profile-form'>
              <div className='profile-row'>
                <label>Nombre:</label>
                <input 
                  type='text'
                  value={user.firstName}
                  onChange={(e) => handleUser('firstName', e.target.value)}
                  className='profile-input'
                />
              </div>

              <div className='profile-row'>
                <label>Apellidos:</label>
                <input 
                  type='text'
                  value={user.lastName}
                  onChange={(e) => handleUser('lastName', e.target.value)}
                  className='profile-input'
                />
              </div>

              <div className='profile-row'>
                <label>Correo electrónico:</label>
                <input 
                  type='email'
                  disabled
                  value={user.email}
                  className='profile-input'
                />
              </div>

              <div className='profile-row'>
                <label>Nuevo correo electrónico:</label>
                <input 
                  type='email'
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className='profile-input'
                />
              </div>

              <div className='profile-row'>
                <label>Confirmar correo electrónico:</label>
                <input 
                  type='email'
                  value={confirmEmail}
                  required={newEmail != ''}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  className='profile-input'
                />
              </div>

              <div className='profile-row'>
                <label>Nueva contraseña:</label>

                <div className='password-row'>
                  {showPassword ? (
                    <svg onClick={() => setShowPassword(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                  ) : (
                    <svg onClick={() => setShowPassword(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  )}

                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='profile-input'
                  />
                </div>
              </div>

              <div className='profile-row'>
                <label>Confirmar contraseña:</label>

                <div className='password-row'>
                  {showConfirmPassword ? (
                    <svg onClick={() => setShowConfirmPassword(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                  ) : (
                    <svg onClick={() => setShowConfirmPassword(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  )}

                  <input 
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    required={newPassword != ''}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='profile-input'
                  />
                </div>
              </div>
            </div>

            <div className='submit-button space-above'>
                <input
                  type='submit'
                  value='Guardar cambios'
                  className='create-button'
                />
              </div>
          </form>
        </div>
      ) : (
        <div className='space-top'>
          <h1>Vaya... parece que te has equivocado de ruta</h1>
        </div>
      )}
    </div>
  )
}

export default Profile