import React from 'react'
import './DeleteRecord.css'

function DeleteRecord({ type, title, onCancel, onDelete }) {
  return (
    <div className='frame'>
      <div className='card'>
        <p>¿Seguro que desea borrar el {type}: {title}?</p>
        <div className='buttons'>
          <button className='cancelar' onClick={onCancel}>
            Cancelar
          </button>

          <button className='confirmar' onClick={onDelete}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteRecord