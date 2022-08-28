import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Exercises from './components/Exercises'
import Sessions from './components/Sessions'
import Session from './components/Session'
import Routines from './components/Routines'
import Login from './components/Login'
import Register from './components/Register'
import Routine from './components/Routine'
import MySessions from './components/MySessions'
import MyRoutines from './components/MyRoutines'

const API_URL = 'http://127.0.0.1:8000/api'

const App = () => {
  const [userId, setUserId] = useState('')

  return (
    <Router>
      {localStorage.getItem('id') !== null ? (
        <>
          <Navbar userId={userId} setUserId={setUserId} />
          <Routes>
            <Route 
              path='/' 
              element={
                <>
                  <Home />
                </>
              }
            />

            <Route
              path='exercises'
              element={
                <Exercises API_URL={API_URL} />
              }
            />

            <Route
              path='sessions'
              element={localStorage.getItem('role') == 'customer' ? (
                <MySessions API_URL={API_URL} />
              ) : (
                <Sessions API_URL={API_URL} />
              )}
            />

            <Route
              path='session/:id'
              element={
                <Session API_URL={API_URL} />
              }
            />

            <Route
              path='routines'
              element={localStorage.getItem('role') == 'customer' ? (
                <MyRoutines API_URL={API_URL} />
              ) : (
                <Routines API_URL={API_URL} />
              )}
            />

            <Route
              path='routine/:id'
              element={
                <Routine API_URL={API_URL} />
              }
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route 
            path='/*' 
            element={
              <>
                <Login API_URL={API_URL} userId={userId} setUserId={setUserId} />
              </>
            }
          />

          <Route 
            path='/sign-in' 
            element={
              <>
                <Register API_URL={API_URL} userId={userId} setUserId={setUserId} />
              </>
            }
          />
        </Routes>
      )}
    </Router>
  )
}

export default App