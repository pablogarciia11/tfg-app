import React from 'react'
import '../styles/SessionCompleted.css'

const RoutineCompleted = (props) => {
  const handleClose = () => {
    const updatedPopup = {}
    updatedPopup['isLoading'] = false

    props.setTrigger({
      ...props.trigger,
      ...updatedPopup
    })
  }

  const handleCompleted = (routine) => {
    let updated = {...routine}
    updated.completed = !routine.completed

    props.setRoutine(updated)

    handleClose()
  }

  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <p>¿Marcar como completada {` la rutina: ${props.trigger.record.name}?`}</p>

            <div className='group-btn'>
              <button className='cancel-button' onClick={() => handleClose()} >
                Cancelar
              </button>
  
              <button className='create-button' onClick={() => handleCompleted(props.trigger.record)}>
                Completada
              </button>
            </div>
        </div>
    </div>
  ) : <h1>hola</h1>
}

export default RoutineCompleted