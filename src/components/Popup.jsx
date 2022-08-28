import React from 'react'
import '../styles/Popup.css'

const Popup = (props) => {
  const handleClose = () => {
    const updatedPopup = {}
    updatedPopup['isLoading'] = false

    props.setTrigger({
      ...props.trigger,
      ...updatedPopup
    })
  }

  const deleteExercise = async (id) => {
    await fetch(`${props.API_URL}/exercises/${id}`, {
      method: 'DELETE'
    }).then(setTimeout(handleClose(), 1000))
  }

  const deleteSession = async (id) => {
    await fetch(`${props.API_URL}/sessions/${id}`, {
      method: 'DELETE'
    }).then(setTimeout(handleClose(), 1000))
  }

  const deleteRoutine = async (id) => {
    await fetch(`${props.API_URL}/routines/${id}`, {
      method: 'DELETE'
    }).then(setTimeout(handleClose(), 1000))
  }

  const handleDelete = async(id) => {
    if(props.type === 'ejercicio') {
      deleteExercise(id)
    } else if(props.type === 'sesión') {
      deleteSession(id)
    } else if(props.type === 'rutina') {
      deleteRoutine(id)
    }
  }

  return (props.trigger) ? (
      <div className='popup'>
          <div className='popup-inner'>
              <p>¿Está seguro que desea eliminar
                {props.type === 'ejercicio' ? 
                  ` el ejercicio: ${props.trigger.record.fullName}` : 
                  ` la ${props.type}: ${props.trigger.record.name}?`
                }
              </p>
  
              <div className='group-btn'>
                <button className='close-btn' onClick={() => handleClose()} >
                  Cancelar
                </button>
    
                <button className='confirm-btn' onClick={() => handleDelete(props.trigger.record.id)}>
                  Eliminar
                </button>
              </div>
          </div>
      </div>
    ) : ''
}

export default Popup