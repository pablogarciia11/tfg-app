import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Pagination } from '@mui/material'
import '../styles/Exercises.css'
import NewExercise from './NewExercise'
import Popup from './Popup'

const Exercises = ({ API_URL }) => {
  const [exercises, setExercises] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)
  const [buttonPopup, setButtonPopup] = useState({
    isLoading: false,
    record: {}
  })

  const [emptyExercise, setEmptyExercise] = useState({
    name: '',
    equipment: '',
    fullName: '',
    mainMuscle: '',
    secondMuscle: '',
    description: '',
    createdBy: localStorage.getItem('id'),
    video: ''
  })

  const [pageNumbers, setPageNumbers] = useState(0)
  const [actualPage, setActualPage] = useState(1)

  const [editExercise, setEditExercise] = useState({})

  const getExercises = async (name) => {
    const res = await fetch(`${API_URL}/exercises/${name}`)
    const data = await res.json()

    setPageNumbers(Math.ceil(data.length / 9))
    if(localStorage.getItem('role') == 'trainer') {
      let filtered = data.filter(ex => ex.createdBy == localStorage.getItem('id'))
      setExercises(filtered)
    } else {
      setExercises(data)
    }
    
    exercises.map(ex => console.log(ex))
  }

  useEffect(() => {
    getExercises('')
  }, [API_URL, show])

  const handleChange = (search) => {
    setSearchTerm(search)
    getExercises(search)
  }

  const handleEdit = (exercise) => {
    if(exercise.description === null) {
      exercise.description = ''
    }

    if(exercise.secondMuscle === null) {
      exercise.secondMuscle = ''
    }

    if(exercise.video === null) {
      exercise.video = ''
    }

    setEditExercise(exercise)
    setShow(true)
    setEdit(true)
  }

  const handleDelete = (exercise) => {
    setButtonPopup({
      isLoading: true,
      record: exercise
    })
  }

  const onShow = () => {
    setShow(!show)
    if(edit) {
      setEdit(false)
    }
  }

  return (
    <div className='page-body'>
      <h1>{show ? 'Nuevo ejercicio' : 'Ejercicios'}</h1>

      <button onClick={() => onShow()}>
        {show ? 'Cancelar' : 'Crear ejercicio'}
      </button>

      <br />

      {buttonPopup.isLoading ? (
        <Popup API_URL={API_URL} trigger={buttonPopup} setTrigger={setButtonPopup} type={'ejercicio'} />
      ) : (
        <></>
      )}

      {show ? (
        <>
          <NewExercise 
            API_URL={API_URL} 
            onShow={onShow} 
            exercise={edit ? editExercise : emptyExercise}
            setExercise={edit ? setEditExercise : setEmptyExercise}
            edit={edit}
          />
        </>
      ) : (
        <>
          <div className='search'>
            <input
              className='search-box'
              placeholder='Busca por nombre o grupo muscular'
              size='31'
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>

          {exercises?.length > 0 ? (
            <>
              <Grid container rowSpacing={3} columnSpacing={0}>
                  {exercises.map(exercise => (
                    <Grid key={exercise.id} item xs={4} className='center-label'>
                      <label key={exercise.id} className="adjacent" >
                        <div className="">
                          <a href={exercise.video} target="_blank" rel="noopener noreferrer" className='link' >
                            {exercise.fullName}
                          </a>
                          
                          <span className="d-block small">
                            {exercise.mainMuscle} 
                            {exercise.secondMuscle !== '' && exercise.secondMuscle !== null ? `, ${exercise.secondMuscle}` : ''}
                          </span>
                        </div>
                        <div className='actions'>
                          <svg 
                            onClick={() => handleEdit(exercise)}
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pencil bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                          <br />
                          <svg 
                            onClick={() => handleDelete(exercise)}
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="trash bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                          </svg>
                        </div>
                      </label>
                    </Grid>
                  ))}
              </Grid>

              <Pagination count={pageNumbers} color="primary" />
            </>
            ) : (
              <h1>
                No se han encontrado ejercicios
              </h1>
            )
          }
        </>
      )}
    </div>
  )
}

export default Exercises