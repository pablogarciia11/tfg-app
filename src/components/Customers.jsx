import React, { useEffect } from 'react'
import { useState } from 'react'
import '../styles/Customers.css'
import ShowCustomers from './ShowCustomers'

const Customers = ({API_URL}) => {
  const [customers, setCustomers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [showMine, setShowMine] = useState(true)
  const [petitions, setPetitions] = useState([])
  const [dummy, setDummy] = useState(false)

  useEffect(() => {
    const getCustomers = async () => {
      await fetch(`${API_URL}/users`)
            .then(res => res.json())
            .then(data => {
              setCustomers(data.filter(d => 
                d.trainer != localStorage.getItem('id') &&
                d.id != localStorage.getItem('id'))
              )
              setFiltered(data.filter(d => d.trainer == localStorage.getItem('id')))
            })
    }

    const getPetitions = async () => {
      await fetch(`${API_URL}/petitions/${localStorage.getItem('id')}`, {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify({sender: localStorage.getItem('id')})
      })
      .then(res => res.json())
      .then(data => setPetitions(data))
    }

    getCustomers()
    getPetitions()
  }, [API_URL, dummy])

  return (
    <div className='customers-container'>
      <div className='cutomers-options'>
        <h1 className={`customer-title ${showMine ? 'title-selected' : ''}`} onClick={() => setShowMine(true)}>
          Mis clientes
        </h1>
        <h1>|</h1>
        <h1 className={`customer-title ${showMine ? '' : 'title-selected'}`} onClick={() => setShowMine(false)}>
          Buscar nuevo
        </h1>
      </div>

      {showMine ? (
        (filtered.length > 0 ? (
          <ShowCustomers 
            customers={filtered}
            API_URL={API_URL}
            actions={false}
            dummy={dummy}
            setDummy={setDummy}
          />
        ) : (
          <h1>
            No se han encontrado sesiones
          </h1>
        ))
      ) : (
        (customers.length > 0 ? (
          <ShowCustomers 
            customers={customers}
            API_URL={API_URL}
            actions={true}
            petitions={petitions}
            dummy={dummy}
            setDummy={setDummy}
          />
        ) : (
          <h1>
            No se han encontrado sesiones
          </h1>
        ))
      )}
    </div>
  )
}

export default Customers