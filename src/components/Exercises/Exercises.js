import React, { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import  Popup from 'reactjs-popup'
import Header from '../Header'
import DeleteRecord from '../DeleteRecord'
import NewExercise from './NewExercise'
import './Exercises.css'

function Exercises({ fetchData, addData}) {
  const [exercises, setExercises] = useState([])
  const [muscles, setMuscles] = useState([])

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
  }, [fetchData, addData])

  const addExercise = async (exercise, mainMuscle, secondMuscle) => {
    const data = await addData(exercise, 'exercises')
    setExercises([...exercises, data])

    const updatedExercises = await fetchData('exercises')

    updatedExercises.map((updatedExercise) => {
      if (updatedExercise.fullName === exercise.fullName) {
        if (mainMuscle !== '') {
          addMuscle(mainMuscle, 'Principal', updatedExercise.id)
        }
        if (secondMuscle !== '') {
          addMuscle(secondMuscle, 'Secundario', updatedExercise.id)
        }
      }
    })
  }

  const addMuscle = async (muscle, type, exerciseId) => {
    const muscleToAdd = {name: muscle, type: type, exerciseId: exerciseId}

    await addData(muscleToAdd, 'muscles')
  }

  const deleteExercise = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/exercises/${id}`, {
      method: 'DELETE'
    })

    setExercises(exercises.filter((exercise) => exercise.id !== id))
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
                  <Popup 
                    trigger={<i className="bi bi-trash-fill" ></i>} position="center center">
                    <DeleteRecord type='ejercicio' title={exercise.name} onCancel='' onDelete={() => deleteExercise(exercise.id)}/>
                  </Popup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Routes>
        <Route
          path='exercises/new-exercise'
          element={<NewExercise 
            addExercise={addExercise}
          />}
        />
      </Routes>
    </>
  )
}

export default Exercises