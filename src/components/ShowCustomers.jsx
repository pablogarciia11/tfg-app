import { Grid } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import '../styles/ShowCustomers.css'

const ShowCustomers = ({customers, API_URL, actions, petitions, dummy, setDummy}) => {
  const [filtered, setFiltered] = useState([])

  const handleFiltered = (search) => {
    setFiltered(customers.filter(c => 
      c.fullName.toLowerCase().includes(search) || c.userName.toLowerCase().includes(search)
    ))
  }

  const checkPending = (receiver) => {
    let pending = false
    petitions.forEach(p => {
      if(p.receiver == receiver && p.status == 'pending') {
        pending = true
      }
    })

    return pending
  }

  const sendPetition = async (receiver) => {
    let actualDate = new Date()
    let format = moment(actualDate).format('YYYY-MM-DD')
    let petition = {
      date: format,
      status: 'pending',
      sender: localStorage.getItem('id'),
      receiver: receiver
    }

    await fetch(`${API_URL}/petitions`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(petition)
    })

    setDummy(!dummy)
  }

  const cancelPending = async (receiver) => {
    petitions.forEach(p => {
      if(p.receiver == receiver && p.status == 'pending') {
        p.status = 'cancelled'

        fetch(`${API_URL}/petitions/${p.id}`, {
          method: 'DELETE',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(p)
        })
      }
    })

    setDummy(!dummy)
  }

  useEffect(() => {
    setFiltered([...customers])
  }, [customers])

  return (
    <>
      <div className='search'>
        <input
          className='search-box'
          size='31'
          placeholder='Buscar usuarios'
          onChange={(e) => handleFiltered(e.target.value)}
        />
      </div>

      {filtered.length > 0 ? (
        <Grid container rowSpacing={3} columnSpacing={0}>
          {filtered.map(f => (
              <Grid key={f.id} item xs={4} className='center-label'>
                <label key={f.id} className="adjacent customer-label" >
                  <div className="">
                    {f.fullName}
                    <span className="d-block small">
                      {f.userName} 
                    </span>
                  </div>

                  {actions ? (
                    <div className='actions'>
                      {(checkPending(f.id)) ? (
                        <button onClick={() => cancelPending(f.id)}>
                          Cancelar <br />
                          solicitud
                        </button>
                      ) : (
                        <button onClick={() => sendPetition(f.id)}>
                          Enviar <br />
                          solicitud
                        </button>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </label>
              </Grid>
          ))}
        </Grid>
      ) : (
        <h1>
          No se han encontrado registros
        </h1>
      )}
    </>
  )
}

export default ShowCustomers