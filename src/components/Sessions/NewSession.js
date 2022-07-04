import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NewSession.css'

function NewSession( {onAdd, exercisesFromServer} ) {
  const [name, setName] = useState('')
  const [exercises, setExercises] = ([{exerciseId: '',name: '', series: '', minReps: 0, maxReps: 0, rest: 0, RIR: 0, observations: '', sessionId: ''}])
  const [description, setDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    onAdd({ name, description })

    setName('')
    setDescription('')
  }

  return (
    <div className='form-container'>
      <h2>Nueva Sesión</h2>
      <form className='add-session' onSubmit={onSubmit}>
        <div className='form-adjacent'>
          <label>Nombre</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <table className='no-style'>
          <thead>
            <tr className='no-style'>
              <th className='no-style'>Ejercicios:</th>
              <th className='no-style'>Series</th>
              <th colSpan={3} className='no-style'>Repeticiones</th>
              <th className='no-style'>RIR</th>
              <th className='no-style'>Descanso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td className='no-style align-left'>
                  <select>
                  {exercisesFromServer.map((exerciseFromServer) => (
                    <option key={exerciseFromServer.id} value={exerciseFromServer.id}>{exerciseFromServer.fullName}</option>
                  ))}
                  </select>
                </td>
                <td className='no-style'></td>
                <td className='no-style'></td>
                <td className='no-style'>-</td>
                <td className='no-style'></td>
                <td className='no-style'></td>
                <td className='no-style'></td>
              </tr>
          </tbody>
        </table>

        <div className='form-above'>
          <label>Descripción</label>
          <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className='btn-group'>
          <Link to={'/sessions'}>
            <button className='btn-cancel'>Cancelar</button>
          </Link>
          <input className='btn btn-block' type='submit' value='Añadir sesión' />
        </div>
      </form>
    </div>
  )
}

export default NewSession