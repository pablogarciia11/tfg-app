import React from 'react'
import './Popup.css'

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
          {props.children}

          <div className='group-btn'>
            <button className='close-btn' onClick={() => props.setTrigger(false)} >
              Cancelar
            </button>

            <button className='confirm-btn' onClick={props.onDelete}>
              Eliminar
            </button>
          </div>
        </div>
    </div>
  ) : ''
}

export default Popup