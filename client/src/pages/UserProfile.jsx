import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avator from '../images/avatar2.jpg'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext';

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avator)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

useEffect(()=>{
  if(!token){
    navigate('/login')
  }
},[])
  return (
    <section className='profile'>
      <div className="container profile__container">
        <Link to={`/mypost/aaa`} className='btn'>My post</Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="" />
            </div>
            <form className='avatar__form' action="">
              <div className="avatar__form">
                <input type="file" name='avatar' id='avatar' onChange={e => { setAvatar(e.target.files[0]) }} accept='png,jpg,jpeg' />
                <label htmlFor="avatar"><FaEdit /></label>
              </div>
            </form>
            <button className="profile__avatar-btn"><FaCheck /></button>
          </div>
          <h1>Sachin</h1>
          <form action="" className='form profile__form'>
            <p className='form__error-message'>This is a error msg</p>
            <input type="text" placeholder='Full name' value={name} onChange={e => { setName(e.target.value) }} />
            <input type="email" placeholder='Email' value={email} onChange={e => { setEmail(e.target.value) }} />
            <input type="password" placeholder='Current Password' value={currentPassword} onChange={e => { setCurrentPassword(e.target.value) }} />
            <input type="password" placeholder='New Password' value={newPassword} onChange={e => { setNewPassword(e.target.value) }} />
            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value) }} />
            <button type='submit' className='btn primary'>Update My Details</button>
          </form>
        </div>
      </div>

    </section>
  )
}

export default UserProfile
