import { useState, useEffect } from "react"
import '../styles/Home.css'
import MyRoutines from "./MyRoutines"
import MySessions from "./MySessions"

const Home = ({API_URL}) => {
  const [petitions, setPetitions] = useState([])
  const [user, setUser] = useState({})
  const [dummy, setDummy] = useState(false)

  const acceptPetition = async (petition, trainer) => {
    petition.status = 'accepted'
    user.trainer = trainer

    await fetch(`${API_URL}/petitions/${petition.id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(petition)
    })
    .then(
      fetch(`${API_URL}/users/${localStorage.getItem('id')}`, {
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(user)
      })
    )
    .then(
      setTimeout(() => setDummy(!dummy), 500)
    )
  }

  const declinePetition = async (petition) => {
    petition.status = 'rejected'

    await fetch(`${API_URL}/petitions/${petition.id}`, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(petition)
    })
    .then(
      setTimeout(() => setDummy(!dummy), 500)
    )
  }

  useEffect(() => {
    const getPetitions = async () => {
      await fetch(`${API_URL}/petitions`)
            .then(res => res.json())
            .then(data => {
              setPetitions(data.filter(f => f.receiver == localStorage.getItem('id') && f.status == 'pending'))
            })
    }
  
    const getUser = async () => {
      await fetch(`${API_URL}/users`)
            .then(res => res.json())
            .then(data => {
              data.map(user => {
                if(user.id == localStorage.getItem('id')) {
                  setUser(user)
                }
              })
            })
    }

    getPetitions()
    getUser()
  }, [API_URL, dummy])

  return (
    <div>
      {petitions.length > 0 ? (
        <div>
          <div className="pending-petitions">
            <h2>Peticiones pendientes</h2>
            {petitions.map((petition, i) => {
              return  <label key={petition.id} className="adjacent petiton" >
                        <div className="">
                          {petition.senderName}
                          <span className="d-block small">
                            {petition.senderUserName} 
                          </span>
                        </div>
                        <div className='petitions-actions'>
                          <button className="petition-action reject-petition-button" onClick={() => declinePetition(petition)}>
                            Rechazar
                          </button>

                          <button className="petition-action accept-petition-button" onClick={() => acceptPetition(petition, petition.sender)}>
                            Aceptar
                          </button>
                        </div>
                      </label>
            })}
          </div> 
        </div>
      ) : (
        <></>
      )}

      <div className="customer-activity">
        <MySessions API_URL={API_URL} />

        <MyRoutines API_URL={API_URL} />
      </div>
    </div>
  )
}

export default Home