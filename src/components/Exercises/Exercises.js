import React from 'react'
import { Link } from 'react-router-dom'
import  Popup from 'reactjs-popup'
import Header from '../Header.js'
import './Exercises.css'
import DeleteRecord from '../DeleteRecord.js'

function Exercises( {exercises, muscles, onDelete} ) {
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
                    {/*<DeleteRecord type='ejercicio' title={exercise.name} onCancel='' onDelete={onDelete(exercise.id)}/>*/}
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