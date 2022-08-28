import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import '../styles/Exercises.css'
import NewSession from './NewSession'
import Popup from './Popup'

const Sessions = ({API_URL}) => {
  const [sessions, setSessions] = useState([])
  const [exercises, setExercises] = useState([])
  const [customers, setCustomers] = useState([])
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false)
  const [buttonPopup, setButtonPopup] = useState({
    isLoading: false,
    record: {}
  })

  const [emptySession, setEmptySession] = useState({
    name: '',
    description: '',
    date: '',
    completed: false,
    userId: '',
    createdBy: localStorage.getItem('id')
  })

  const [exercisesSession, setExercisesSession] = useState([
    {
      exerciseId: '',
      name: '',
      series: 0,
      minReps: 0,
      maxReps: 0,
      rest: 0,
      RIR: 0,
      observations: ''
    }
  ])

  const [editSession, setEditSession] = useState({})
  const [editExercisesSession, setEditExercisesSession] = useState({})

  const getSessions = async (name) => {
    await fetch(`${API_URL}/sessions/${name}`)
    .then(res => res.json())
    .then(data => {
      let filtered = []
      if(localStorage.getItem('role') == 'trainer') {
        filtered = data.filter(s => s.createdBy == localStorage.getItem('id'))
      } else if(localStorage.getItem('role') == 'customer') {
        filtered = data.filter(s => s.userId == localStorage.getItem('id'))
      } else {
        filtered = [...data]
      }
      setSessions(filtered)

      let updated = {...editExercisesSession}
      filtered.map(session => {
        fetch(`${API_URL}/exercisesSessions/${session.id}`)
        .then(res => res.json())
        .then(data => {
          updated[session.id] = data

          setEditExercisesSession(updated)
        })
      })
    })
  }

  useEffect(() => {
    const getExercises = async () => {
      const res = await fetch(`${API_URL}/exercises`)
      const data = await res.json()
  
      if(localStorage.getItem('role') == 'trainer') {
        let filtered = data.filter(ex => ex.createdBy == localStorage.getItem('id'))
        setExercises(filtered)
      } else {
        setExercises(data)
      }
    }
  
    const getCustomers = async () => {
      await fetch(`${API_URL}/users`)
            .then(res => res.json())
            .then(data => {
              if(localStorage.getItem('role') == 'trainer') {
                let filtered = data.filter(s => s.trainer == localStorage.getItem('id'))
                setCustomers(filtered)
              } else {
                setCustomers(data)
              }
            })
    }
    
    getSessions('')
    getExercises()
    getCustomers()
  }, [API_URL, show])

  const handleChange = (search) => {
    getSessions(search)
  }

  const handleEdit = (session) => {
    setEditSession(session)
    setShow(true)
    setEdit(true)
  }

  const handleDelete = (session) => {
    setButtonPopup({
      isLoading: true,
      record: session
    })
  }

  const handleEditExercisesSession = (exercisesSession) => {
    let updated = {...editExercisesSession}
    updated[editSession.id] = exercisesSession

    setEditExercisesSession(updated)
  }

  const onShow = () => {
    setShow(!show)
    if(edit) {
      setEdit(false)
    }
  }

  return (
    <div className='page-body'>
      <h1>{show ? 'Nueva sesión' : 'Sesiones'}</h1>

      <button onClick={() => onShow()}>
        {show ? 'Cancelar' : 'Crear sesión'}
      </button>

      <br />

      {buttonPopup.isLoading ? (
        <Popup API_URL={API_URL} trigger={buttonPopup} setTrigger={setButtonPopup} type={'sesión'} />
      ) : (
        <></>
      )}

      {show ? (
        <>
          <NewSession
            API_URL={API_URL} 
            onShow={onShow} 
            session={edit ? editSession : emptySession}
            setSession={edit ? setEditSession : setEmptySession}
            exercisesSession={edit ? editExercisesSession[editSession.id] : exercisesSession}
            setExercisesSession={edit ? handleEditExercisesSession : setExercisesSession}
            exercises={exercises}
            customers={customers}
            edit={edit}
          />
        </>
      ) : (
        <>
          <div className='search'>
            <input
              className='search-box'
              size='31'
              placeholder='Busca por nombre o descripción'
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>

          {sessions?.length > 0 ? (
            <Grid container rowSpacing={3} columnSpacing={0}>
                {sessions.map(session => (
                  <Grid key={session.id} item xs={4} className='center-label'>
                    <label key={session.id} className="adjacent" >
                      <div className="">
                        <Link to={`/session/${session.id}`} className='link' >
                          {session.name}
                        </Link>
                        <span className="d-block small">
                          {session.description} 
                        </span>
                      </div>
                      <div className='actions'>
                        <svg 
                          onClick={() => handleEdit(session)}
                          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pencil bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        <br />
                        <svg 
                          onClick={() => handleDelete(session)}
                          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="trash bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                      </div>
                    </label>
                  </Grid>
                ))}
            </Grid>
            ) : (
              <h1>
                No se han encontrado sesiones
              </h1>
            )
          }
        </>
      )}
    </div>
  )
}

export default Sessions