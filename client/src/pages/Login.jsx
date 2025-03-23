import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import {UserContext} from '../context/userContext.js'

const Login = () => {

  const [userData, setUserData] = useState({
    email:'',
    password:'',
  })

  const navigate = useNavigate()
  const {setCurrentUser} = useContext(UserContext)
  const [ error, setError] = useState()

  const chnageInputHandler = (e)=>{
    setUserData(prevState=>{
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const login = async(e)=>{
    e.preventDefault()
    setError('')
    try {
      console.log('aa')
      const responce = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData)
      const user = await responce.data
      setCurrentUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }

  }

  return (
    <div className='login'>
      <div className="container">
        <div>

        <h2>Sign In</h2>
        </div>
        <form className='form login__form' onSubmit={login}>
          {error&&<p className='form__error-message'>{error}</p>}
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={chnageInputHandler} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={chnageInputHandler} />
          <button type='submit' className='btn primary'>Login</button>
        </form>
        <small className='login__small'>Dont't have an have a account ? <Link to ='/register'><span>Sign Up</span></Link></small>
      </div>
    </div>
  )
}

export default Login
