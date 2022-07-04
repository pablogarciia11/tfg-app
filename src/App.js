import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect} from 'react'
import Home from './components/Home'
import Header from './components/Header.js'
import Exercises from './components/Exercises/Exercises.js'
import NewExercise from './components/Exercises/NewExercise.js'
import Exercise from './components/Exercises/Exercise.js'
import Sessions from './components/Sessions/Sessions.js'
import NewSession from './components/Sessions/NewSession.js'
import Session from './components/Sessions/Session.js'
import Routines from './components/Routines/Routines.js'

function App() {
  const [exercises, setExercises] = useState([])
  const [muscles, setMuscles] = useState([])
  const [mainMuscle, setMainMuscle] = useState('')
  const [secondMuscle, setSecondMuscle] = useState('')
  const [sessions, setSessions] = useState([])
  const [routines, setRoutines] = useState([])

  // Método que recupera los valores de la base de datos
  useEffect(() => {
    const getExercises = async () => {
      const exercisesFromServer =  await fetchData('exercises')
      setExercises(exercisesFromServer)
    }

    const getMuscles = async () => {
      const musclesFromServer = await fetchData('muscles')
      setMuscles(musclesFromServer)
    }

    const getSessions = async () => {
      const sessionsFromServer = await fetchData('sessions')
      setSessions(sessionsFromServer)
    }

    const getRoutines = async () => {
      const routinesFromServer = await fetchData('routines')
      setRoutines(routinesFromServer)
    }

    getExercises()
    getMuscles()
    getSessions()
    getRoutines()
  }, [])

  // Fetch Data
  const fetchData = async(type) => {
    const res = await fetch(`http://127.0.0.1:8000/api/${type}`)
    const data = await res.json()

    return data
  }

  // Add Data
  const addData = async (record, type) => {
    const res = await fetch(`http://127.0.0.1:8000/api/${type}`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(record)
    })

    const data = await res.json()

    return data
  }


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

    const data = await addData(muscleToAdd, 'muscles')
  }

  const addSession = async (session, exercisesSession) => {
    const data = await addData(session, 'sessions')
    setSessions([...sessions, data])

    const updatedSessions = await fetchData('sessions')

    updatedSessions.map((updatedSession) => {
      if (updatedSession.name === session.name) {
        exercisesSession.map((exerciseSession) => (
          exerciseSession.sessionId = updatedSession.id
        ))
      }
    })
  }

  // Delete Data
  const deleteExercise = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/exercises/${id}`, {
      method: 'DELETE'
    })

    setExercises(exercises.filter((exercise) => exercise.id !== id))
  }

  const deleteSession = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/sessions/${id}`, {
      method: 'DELETE'
    })

    setSessions(sessions.filter((session) => session.id !== id))
  }

  return (
    <Router>
      <Routes>
        <Route
          path='/pruebas'
          element={
            <Header title='Cabeceras'/>
          }
        />

        <Route
          path='/'
          element={<Home />}
        />

        {/* Rutas para ejercicios */}
        <Route 
          path='exercises'
          element=
          {<Exercises 
            exercises={exercises}
            setExercises={setExercises} 
            muscles={muscles} 
            onDelete={deleteExercise}
          />}
        />

        <Route
          path='exercises/new-exercise'
          element={<NewExercise 
            onAdd={addExercise}
          />}
        />

        <Route
          path='exercise/:id'
          element={<Exercise />}
        />

        {/* Rutas para sesiones */}
        <Route 
          path='sessions'
          element=
            {<Sessions 
              sessions={sessions} 
              onDelete={deleteSession}
            />}
        />

        <Route
          path='sessions/new-session'
          element={<NewSession 
            onAdd={addSession}
            exercises={exercises}
          />}
        />

        <Route
          path='session/:id'
          element={<Session />}
        />

        {/*
        <Route 
          path='routines'
          element=
            {<Routines 
              routines={routines} 
            />}
        />

        {/*<Route 
          path='clients'
          element={}
        />

        <Route 
          path='profiles'
          element={}
        />*/}
      </Routes>
    </Router>
  );
}

export default App;
