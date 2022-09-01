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
import Customers from './components/Customers'
import SessionRoutine from './components/SessionRoutine'
import Profile from './components/Profile'

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
              element={localStorage.getItem('role') == 'customer' ? (
                <>
                  <Home API_URL={API_URL} />
                </>
              ) : (
                <Exercises API_URL={API_URL} />
              )}
            />

            <Route
              path='exercises'
              element={
                <Exercises API_URL={API_URL} />
              }
            />

            <Route
              path='sessions'
              element={
                <Sessions API_URL={API_URL} />
              }
            />

            <Route
              path='session/:id'
              element={
                <Session API_URL={API_URL} />
              }
            />

            <Route
              path='sessionRoutine/:id'
              element={
                <SessionRoutine API_URL={API_URL} />
              }
            />

            <Route
              path='routines'
              element={
                <Routines API_URL={API_URL} />
              }
            />

            <Route
              path='routine/:id'
              element={
                <Routine API_URL={API_URL} />
              }
            />

            <Route
              path='customers'
              element={
                <Customers API_URL={API_URL} />
              }
            />  

            <Route
              path='profile/:id'
              element={
                <Profile API_URL={API_URL} />
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