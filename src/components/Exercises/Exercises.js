import React, { useState, useEffect, PureComponent } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
//import Popup from 'reactjs-popup'
import Popup from '../Popup'
import Header from '../Header'
import NewExercise from './NewExercise'
import Exercise from './Exercise'
import './Exercises.css'

function Exercises({ fetchData }) {
  const [exercises, setExercises] = useState([])
  const [muscles, setMuscles] = useState([])
  const [buttonPopup, setButtonPopup] = useState(false)

  useEffect(() => {
    const getExercises = async () => {
      const exercisesFromServer =  await fetchData('exercises')
      setExercises(exercisesFromServer)
    }

    const getMuscles = async () => {
      const musclesFromServer = await fetchData('muscles')
      setMuscles(musclesFromServer)
    }

    getExercises()
    getMuscles()
  }, [fetchData])

  const deleteExercise = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/exercises/${id}`, {
      method: 'DELETE'
    })

    setExercises(exercises.filter((exercise) => exercise.id !== id))
    setButtonPopup(false)
  }

  return (
    <>
      <Header title='Ejercicios' path='new-exercise' />
      <div className='exercises'>
        <table>
          <thead>
            <tr>
              <th className='title'>Nombre</th>
              <th className='muscle'>Grupo muscular</th>
              <th className='delete'>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td className='left-align'>
                  <Link to={`/exercise/${exercise.id}`} className='link'>
                    {exercise.fullName}
                  </Link>
                </td>
                <td className='muscles-col'>
                  {muscles.filter(muscle => muscle.exerciseId === exercise.id).map((m, index, array) => (
                    index === array.length -1 ? `${m.name}` : `${m.name}, `
                  ))}
                </td>
                <td className='delete'>
                  <i className="bi bi-trash-fill" onClick={() => setButtonPopup(true)} ></i>
                  <Popup trigger={buttonPopup} setTrigger={setButtonPopup} onDelete={() => deleteExercise(exercise.id)} >
                    <p>¿Está seguro que desea eliminar el ejercicio: {exercise.fullName}?</p>
                  </Popup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Exercises