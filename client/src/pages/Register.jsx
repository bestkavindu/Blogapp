import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios  from 'axios'
import env from "react-dotenv";

const Register = () => {

  const [userData, setUserData] = useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  })

  const [error, serError] = useState('')
  const navigate = useNavigate()

  const chnageInputHandler = (e)=>{
    setUserData(prevState=>{
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

const registerUser = async(e)=>{
  e.preventDefault()
  serError('')
  // console.log(`${import.meta.env.BASE_URL}`)
  console.log(`${process.env.REACT_APP_BASE_URL}`)
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData)
    const newUser = await response.data
    console.log(newUser)
    if(!newUser){
      serError('Could not register please try again')
    }
    navigate('/login')
  } catch (err) {
    console.log(err.response.data.message)
    serError('err.response.data.message')
    
  }
}

  return (
    <div className='register'>
      <div className="container">
        <h2>Sign Up</h2>
        <form className='form register__form' onSubmit={registerUser}>
         { error && <p className='form__error-message'>{error}</p>}
          <input type="text" placeholder='Full name' name='name' value={userData.name} onChange={chnageInputHandler} />
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={chnageInputHandler} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={chnageInputHandler} />
          <input type="password" placeholder='Confirm Password' name='password2' value={userData.password2} onChange={chnageInputHandler} />
          <button type='submit' className='btn primary'>Register</button>
        </form>
        <small className='register__small'>Allready have a account ? <Link to ='/login'><span>Sign In</span></Link></small>
      </div>
    </div>
  )
}

export default Register
