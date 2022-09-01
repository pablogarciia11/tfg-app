import React, { useEffect, useState } from 'react'
import '../styles/NewSession.css'

const NewSession = ({API_URL, onShow, session, setSession, exercisesSession, setExercisesSession, exercises, customers, edit}) => {
  const emptyExercise = {
    exerciseId: '',
    name: '',
    series: 0,
    minReps: 0,
    maxReps: 0,
    rest: 0,
    RIR: 0,
    observations: ''
  }

  const emptySession = {
    name: '',
    description: '',
    date: '',
    completed: false,
    userId: '',
    createdBy: localStorage.getItem('id')
  }
  
  const handleSession = (key, value) => {
    let updated = {...session}
    updated[key] = value

    setSession(updated)
  }

  const handleExerciseSession = (key, value, i) => {
    let updated = [...exercisesSession]
    updated[i][key] = value

    if(key === 'exerciseId') {
      let ex = exercises.find(filter => (filter.id == value))
      updated[i]['name'] = ex.fullName
    }

    setExercisesSession(updated)
  }

  const removeExerciseSession = (e, i) => {
    let updated = [...exercisesSession]
    updated.splice(i, 1)
    console.log(updated)
    setExercisesSession(updated)
  }

  const addExerciseSession = () => {
    let updated = [...exercisesSession]
    updated.push(emptyExercise)

    setExercisesSession(updated)
  }

  const addSession = async () => {
    console.log(JSON.stringify(session))
    await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(session)
    })
    .then(res => 
      res.json())
    .then(data => {
      exercisesSession.map(ex => {
        ex.sessionId = data.id

        createExerciseSession(ex)
      })
    })
    .then(
      setSession(emptySession),
      setExercisesSession([emptyExercise])
    )
    .then(setTimeout(onShow, 1000))
  }

  const updateSession = async () => {
    await fetch(`${API_URL}/sessions/${session.id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(session)
    })
    .then(res => 
      res.json())
    .then(data => {
      exercisesSession.map(ex => {
        if(ex.sessionId == data.id) {
          updateExerciseSession(ex)
        } else {
          ex.sessionId = data.id

          createExerciseSession(ex)
        }
      })
    })
    .then(
      setSession(emptySession),
      setExercisesSession([emptyExercise])
    )
    .then(setTimeout(onShow, 1000))
  }

  const createExerciseSession = async (ex) => {
    await fetch(`${API_URL}/exercisesSessions`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(ex)
    })
  }

  const updateExerciseSession = async (ex) => {
    fetch(`${API_URL}/exercisesSessions/${ex.id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(ex)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(edit) {
      updateSession()
    } else {
      addSession()
    }
  }

  const handleClick = () => {
    console.log(exercisesSession)
  }

  useEffect(() => {
    console.log(exercisesSession)
  }, [API_URL, onShow, exercisesSession])
  
  return (
    <div className='se-form-container'>
      <form onSubmit={onSubmit}>
        <div className='se-form'>
          <div className='row-section'>
              <input 
                type='text'
                size='75'
                required={true}
                placeholder='Nombre'
                value={session.name}
                onChange={(e) => handleSession('name', e.target.value)}
                />

              <textarea
                className='description-field'
                placeholder='Descripción'
                type='text'
                value={session.description == null ? '' : session.description}
                onChange={(e) => handleSession('description', e.target.value)}
                />
          </div>

          <div className='se-exercises-section'>
            <div className='title-centered'>
              <h5>Ejercicios</h5>
            </div>

            <table>
              <thead>
                <tr>
                  <th></th>
                  <th onClick={() => handleClick()}>Series</th>
                  <th colSpan='1'>Repeticiones</th>
                  <th>RIR</th>
                  <th>Descanso</th>
                  {exercisesSession?.length > 1 ? (
                    <th></th>
                  ) :(
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {exercisesSession?.map((exSession, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <select required={true} value={exSession.exerciseId} onChange={(e) => handleExerciseSession('exerciseId', e.target.value, i)}>
                          <option value='' defaultValue disabled>Seleccione</option>
                          {exercises.map(ex => {
                            return (
                              <option key={ex.id} value={ex.id}>{ex.fullName}</option>
                            )
                          })}
                        </select>
                      </td>

                      <td>
                        <input
                          className='session-input'
                          type='number'
                          value={exSession.series}
                          onChange={(e) => handleExerciseSession('series', e.target.value, i)}
                          />
                      </td>
                      
                      <td>
                        <input
                          className='session-input'
                          type='number'
                          value={exSession.minReps}
                          onChange={(e) => handleExerciseSession('minReps', e.target.value, i)}
                          />

                        <label>
                          -
                        </label>
                        
                        <input
                          className='session-input'
                          type='number'
                          value={exSession.maxReps}
                          onChange={(e) => handleExerciseSession('maxReps', e.target.value, i)}
                          />
                      </td>

                      <td>
                        <input
                          className='session-input'
                          type='number'
                          value={exSession.RIR}
                          onChange={(e) => handleExerciseSession('RIR', e.target.value, i)}
                          />
                      </td>

                      <td>
                        <input
                          className='session-input'
                          type='number'
                          value={exSession.rest}
                          onChange={(e) => handleExerciseSession('rest', e.target.value, i)}
                          />
                      </td>

                      <td>
                        {exercisesSession.length > 1 ? (
                          <button type='button' className='remove-exercise' onClick={(e) => removeExerciseSession(e, i)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                          </button>) : (
                            <></>
                          )}
                      </td>
                    </tr>
                  )
                })}

                <tr>
                  <td colSpan='1'>
                    <button type='button' className='add-exercise' onClick={() => addExerciseSession()} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                      </svg>
                    </button>
                  </td>
                </tr> 
              </tbody>
            </table>
          </div>

          <div className='se-user-info'>
            <div>
              <label>Fecha:</label>
              <br />
              <input 
                type='date' 
                value={session.date == null ? '' : session.date}
                onChange={(e) => handleSession('date', e.target.value)}
              />
            </div>

            <div>
              <label>Asignar:</label>
              <br />
              <select value={session.userId == null ? '' : session.userId} onChange={(e) => handleSession('userId', e.target.value)} >
                <option value='' disabled>Seleccione</option>
                {customers.map(c => {
                  return <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                })}
              </select>
            </div>
          </div>
          
          <div className='submit-button'>
            <input
              type='submit'
              value='Guardar sesión'
              className='create-button'
              />
          </div>          
        </div>
      </form>
    </div>
  )
}

export default NewSession