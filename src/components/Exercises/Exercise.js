import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import YoutubeEmbed from '../YoutubeEmbed.js'
import './Exercise.css'

function Exercise() {
  const [loading, setLoading] = useState(true)
  const [exercise, setExercise] = useState({})
  const [muscles, setMuscles] = useState([])

  const params = useParams()

  useEffect(() => {
      const getExercise = async () => {
        const exerciseFromServer =  await fetchExercise()
        setExercise(exerciseFromServer)
        setLoading(false)
      }

      const getMuscles = async () => {
        const musclesFromServer = await fetchMuscles()
        setMuscles(musclesFromServer)
      }

      getExercise()

      {/*if(exercise != null) {
        getMuscles()
      }*/}
  })

  const fetchExercise = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/exercises/${params.id}`)
    const data = await res.json()

    return data
  }

  const fetchMuscles = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/muscles/${params.id}`)
    const data = await res.json()

    return data
  }

  return loading ? (
    <h3>Cargando...</h3>
  ) : (
    <div className='showExercise'>
      <div className='heading'>
        <Link to='/exercises'>
          <button>
            Volver a ejercicios
          </button>
        </Link>

        <h3>
          {exercise.name}
        </h3>
      </div>
      <YoutubeEmbed embedId='UGhRaGvOpJ0' />
    </div>
  )
}

export default Exercise