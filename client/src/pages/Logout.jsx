import React, { useContext } from 'react'

import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const {setCurrentUser} = useContext(UserContext)
  setCurrentUser(null)
  const navigate = useNavigate()
  navigate('/login')
  return (
    <>
      
    </>
  )
}

export default Logout
