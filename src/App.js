import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Home from './components/Home'
import Header from './components/Header.js'
import Exercises from './components/Exercises/Exercises.js'
import Exercise from './components/Exercises/Exercise.js'
import Sessions from './components/Sessions/Sessions.js'
import NewSession from './components/Sessions/NewSession.js'
import Session from './components/Sessions/Session.js'
import Routines from './components/Routines/Routines.js'
import NewRoutine from './components/Routines/NewRoutine.js'
import Routine from './components/Routines/Routine.js'
import Navbar from './components/Navbar'

function App() {
  const [exercises, setExercises] = useState([])
  const [muscles, setMuscles] = useState([])
  const [mainMuscle, setMainMuscle] = useState('')
  const [secondMuscle, setSecondMuscle] = useState('')
  const [sessions, setSessions] = useState([])
  const [routines, setRoutines] = useState([])

  // Fetch Data
  const fetchData = async(type) => {
    const res = await fetch(`http://127.0.0.1:8000/api/${type}`)
    const data = await res.json()

    console.log(type)

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

  const addRoutine = async (routine) => {
    const data = await addData(routine, 'routines')
    setRoutines([...routines, data])
  }

  const deleteSession = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/sessions/${id}`, {
      method: 'DELETE'
    })

    setSessions(sessions.filter((session) => session.id !== id))
  }

  const deleteRoutine = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/routines/${id}`, {
      method: 'DELETE'
    })

    setRoutines(routines.filter((session) => session.id !== id))
  }

  return (
    <Router>
      <Navbar />
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
          path='exercises/*'
          element=
          {<Exercises 
            fetchData={fetchData}
          />}
        />

        {/*<Route
            path='exercises/new-exercise'
            element={<NewExercise 
              addExercise={addExercise}
            />}
          />*/}

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

        {/* Rutas para rutinas */}
        <Route 
          path='routines'
          element=
            {<Routines 
              routines={routines}
              onDelete={deleteRoutine} 
            />}
        />

        <Route
          path='routines/new-routine'
          element={<NewRoutine 
            onAdd={addRoutine}
            routines={routines}
          />}
        />

        <Route
          path='routine/:id'
          element={<Routine />}
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
