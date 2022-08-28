import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const SessionRoutine = ({API_URL}) => {
  const params = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState({})
  const [exercisesSession, setExercisesSession] = useState([])

  return (
    <div>SessionRoutine</div>
  )
}

export default SessionRoutine