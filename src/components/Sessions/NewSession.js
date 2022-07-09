import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './NewSession.css'

function NewSession({ fetchData, addSession }) {
  const [exercisesFromServer, setExercisesFromServer] = useState([])
  const [name, setName] = useState('')
  const [exercises, setExercises] = useState([{
    id: 1,
    name: '',
    series: 0,
    minReps: 0,
    maxReps: 0,
    RIR: 0,
    rest: 0
  }])
  const [description, setDescription] = useState('')

  useEffect(() => {
    const getExercises = async () => {
      setExercisesFromServer(await fetchData('exercises'))
    }

    getExercises()
  }, [fetchData, setExercisesFromServer])

  const onSubmit = (e) => {
    e.preventDefault()

    addSession({ name, description })

    setName('')
    setDescription('')
  }

  const addExercise = (e) => {
    console.log(e.reps)
  }

  const removeExercise = (e) => {

  }

  return (
    <div className='form-container'>
      <h2>Nueva Sesión</h2>
      <form className='add-session' onSubmit={onSubmit}>
        <div className='form-adjacent'>
          <label>Nombre de la sesión:</label>
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
            {exercises.map((exercise) => {
              <tr key={exercise.id}>
                <td className='no-style align-left'>
                  <select>
                  {exercisesFromServer.map((exerciseFromServer) => (
                    <option key={exerciseFromServer.id} value={exerciseFromServer.id}>{exerciseFromServer.fullName}</option>
                  ))}
                  </select>
                </td>
                <td className='no-style'>
                  <input type='number' min='0' value={exercise.series} />
                </td>
                <td className='no-style'>
                  <input type='number' min='0' value={exercise.minReps} />
                </td>
                <td className='no-style'>-</td>
                <td className='no-style'>
                  <input type='number' min='0' value={exercise.maxReps} />
                </td>
                <td className='no-style'>
                  <input type='number' min='0' value={exercise.RIR} />
                </td>
                <td className='no-style'>
                  <input type='number' min='0' value={exercise.rest} />
                </td>
                <td className='no-style'>
                  {exercises.length > 1 ? 
                    <button onClick={(e) => addExercise(e.target.value)}>
                      <i class="bi bi-dash-circle"></i>
                    </button> : <></>
                  }
                  <button onClick={(e) => removeExercise(e.target.value)}>
                    <i class="bi bi-plus-circle-fill"></i>
                  </button>
                </td>
              </tr>
            })}
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