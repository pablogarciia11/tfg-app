import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NewExercise.css'

function NewExercise({ addExercise }) {
  const [name, setName] = useState('')
  const [equipment, setEquipment] = useState('')
  const [video, setVideo] = useState('')
  const [description, setDescription] = useState('')
  const [mainMuscle, setMainMuscle] = useState('')
  const [secondMuscle, setSecondMuscle] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    const fullName = name + ' con ' + equipment.toLowerCase()

    addExercise({ name, equipment, fullName, video, description }, mainMuscle, secondMuscle)

    setName('')
    setEquipment('')
    setVideo('')
    setDescription('')
    setMainMuscle('')
    setSecondMuscle('')
  }

  const muscleList = [
    {id: 1, name:'Bíceps'},
    {id: 2, name:'Core'},
    {id: 3, name:'Cuádriceps'},
    {id: 4, name:'Deltoides'},
    {id: 5, name:'Espalda'},
    {id: 6, name:'Gemelo y sóleo'},
    {id: 7, name:'Glúteo'},
    {id: 8, name:'Isquio'},
    {id: 9, name:'Pectoral'},
    {id: 10, name:'Tríceps'}
  ]
  const [mainList, setMainList] = useState(muscleList)
  const [secondList, setSecondList] = useState(muscleList)

  const updateMain = (e) => {
    const newList = muscleList.filter(element => element !== e)
    
    setSecondList(newList)
    setMainMuscle(e)
  }

  const updateSecond = (e) => {
    const newList = muscleList.filter(element => element !== e)
    
    setMainList(newList)
    setSecondMuscle(e)
  }

  return (  
    <div className='form-container'>
      <h2>Nuevo Ejercicio</h2>
      <form className='add-exercise' onSubmit={ onSubmit } >
        <div className='form-adjacent'>
          <label>Nombre</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className='form-adjacent'>
          <label>Material</label>
          <select defaultValue={equipment} onChange={(e) => setEquipment(e.target.value)}>
            <option value='' defaultValue disabled>Seleccione</option>
            <option value='Barra olímpica'>Barra olímpica</option>
            <option value='Goma elástica'>Goma elástica</option>
            <option value='Kettlebell'>Kettlebell</option>
            <option value='Mancuernas'>Mancuernas</option>
            <option value='Polea'>Polea</option>
          </select>
        </div>

        <div className='form-control muscle-section'>
          <label style={{fontWeight: 'bold'}}>Grupos musculares:</label>
          <div className='muscles'>
            <div className='form-muscle'>
              <label>Principal</label>
              <select defaultValue={equipment} onChange={(e) => updateMain(e.target.value)}>
                <option value='' defaultValue disabled>Seleccione</option>
                {mainList.map((group) => (
                  <option key={group.id} value={group.name}>{group.name}</option>
                ))}
              </select>
            </div>

            <div className='form-muscle'>
              <label>Secundario</label>
              <select defaultValue={equipment} onChange={(e) => updateSecond(e.target.value)}>
                <option value=''>-- Ninguno --</option>
                {secondList.map((group) => (
                  <option key={group.id} value={group.name}>{group.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className='form-above'>
          <label>Vídeo</label>
          <input type='file' value={video} onChange={(e) => setVideo(e.target.value)} />
        </div>

        <div className='form-above'>
          <label>Descripción</label>
          <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className='btn-group'>
          <Link to={'/exercises'}>
            <button className='btn-cancel'>Cancelar</button>
          </Link>
          <input className='btn btn-block' type='submit' value='Añadir ejercicio' />
        </div>
      </form>
    </div>
  )
}

export default NewExercise