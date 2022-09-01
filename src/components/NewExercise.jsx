import React, { useEffect, useState } from 'react'
import '../styles/NewExercise.css'

const NewExercise = ({API_URL, onShow, exercise, setExercise, edit}) => {
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

  const emptyExercise = {
    name: '',
    equipment: '',
    fullName: '',
    mainMuscle: '',
    secondMuscle: '',
    description: '',
    createdBy: localStorage.getItem('id'),
    video: ''
  }

  const handleExercise = (key, value) => {
    const updatedExercise = {}
    updatedExercise[key] = value
    
    let union = ''
    
    if(key === 'name') {
      if(exercise.equipment === 'Barra' || exercise.equipment === 'Máquina') {
        union = ' en '
      } else if(exercise.equipment === '') {
        union = ''
      } else {
        union = ' con '
      }
      updatedExercise.fullName = value + union + exercise.equipment.toLowerCase()
    }

    if(key === 'equipment') {
      if(value === 'Barra' || value === 'Máquina') {
        union = ' en '
      } else if(value === '') {
        union = ''
      } else {
        union = ' con '
      }

      updatedExercise.fullName = exercise.name + union + value.toLowerCase()
    }

    setExercise({
      ...exercise,
      ...updatedExercise
    })
  }

  const handleMuscle = (type, value) => {
    const updatedExercise = {}
    updatedExercise[type] = value

    const updatedList = muscleList.filter(muscle => muscle.name !== value)

    setExercise({
      ...exercise,
      ...updatedExercise
    })
    if(type === 'mainMuscle') {
      setSecondList(updatedList)
    } else {
      setMainList(updatedList)
    }
  }

  const addExercise = async () => {
    await fetch(`${API_URL}/exercises`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(exercise)
    }).then(setTimeout(onShow, 1000))
    .then(setExercise(emptyExercise))
  }

  const updateExercise = async () => {
    await fetch(`${API_URL}/exercises/${exercise.id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(exercise)
    }).then(setTimeout(onShow, 1000))
    .then(setExercise(emptyExercise))
    
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    if(edit) {
      updateExercise()
    } else {
      addExercise()
    }
  }

  useEffect(() => {
    if(exercise.description === '') {
      console.log('vacio')
    }
    
    if(exercise.description === null) {
      console.log('null')
    }
  })

  return (
    <div className='ex-form-container'>
      <form onSubmit={onSubmit}>
        <div className='ex-form-body'>
          <input 
            required={true}
            type='text'
            size='39'
            placeholder='Nombre'
            value={exercise.name}
            onChange={(e) => handleExercise('name', e.target.value)}
          />

          <div className='section-adjacent'>
            <label>Material:</label>
            <select defaultValue={exercise.equipment} onChange={(e) => handleExercise('equipment', e.target.value)}>
              <option value='' defaultValue disabled>Seleccione</option>
              <option value='Barra'>Barra</option>
              <option value='Barra olímpica'>Barra olímpica</option>
              <option value='Barra hexagonal'>Barra hexagonal</option>
              <option value='Barra Z'>Barra Z</option>
              <option value='Goma elástica'>Goma elástica</option>
              <option value='Kettlebell'>Kettlebell</option>
              <option value='Mancuernas'>Mancuernas</option>
              <option value='Máquina'>Máquina</option>
              <option value='Polea'>Polea</option>
              <option value=''>Sin material</option>
            </select>
          </div>

          <div className='muscle-section'>
            <label className='label-bold'>Grupos musculares:</label>

            <div className='muscle-group'>
              <div className='muscle'>
                <label>Principal</label>
                <select required defaultValue={exercise.mainMuscle} onChange={(e) => handleMuscle('mainMuscle', e.target.value)}>
                  <option value='' defaultValue disabled>Seleccione</option>
                  {mainList.map((group) => (
                    <option key={group.id} value={group.name}>{group.name}</option>
                  ))}
                </select>
              </div>

              <div className='muscle'>
                <label>Secundario</label>
                <select defaultValue={exercise.secondMuscle} onChange={(e) => handleMuscle('secondMuscle', e.target.value)}>
                  <option value='' defaultValue disabled>Seleccione</option>
                  {secondList.map((group) => (
                    <option key={group.id} value={group.name}>{group.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="video-information">
            <label>Vídeo:</label>

            <input 
              type="url" 
              placeholder="https://ejemplo.com"
              pattern="https://.*"
              size='32'
              value={exercise.video}
              onChange={(e) => handleExercise('video', e.target.value)}
            />
          </div>          

          <textarea
            className='description-field'
            placeholder='Descripción'
            type='text'
            value={exercise.description}
            onChange={(e) => handleExercise('description', e.target.value)}
          />

          <div className='submit-button'>
            <input
              type='submit'
              value='Guardar ejercicio'
              className='create-button'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewExercise