import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const EditPost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

useEffect(()=>{
  if(!token){
    navigate('/login')
  }
},[])

  const POST_CATEGORIES = ["Agriculture", "Education", "Art", "Invesment", "Weather","IT"]

  return (
    <section className="section create-opost">
      <div className="container">
        <h2>Edit post</h2>
        <p className='form__error-message'>This is error message</p>
        <form action="" className="form create-post__form">
        <input type="text" placeholder='Title' value={title} onChange={e=>{setTitle(e.target.value)}} autoFocus/>
        <select name="category" value={category} onChange={e=>{setCategory(e.target.value)}} id="">
          {
            POST_CATEGORIES.map(cat=> <option key={cat}>{cat}</option>)
          }
        </select>
        <input type="file" onChange={e=> setImg(e.target.files[0])} accept='png,jpg, jpeg' />
        <ReactQuill theme="snow" value={desc} onChange={setDesc} />
        <button type="submit" className='btn primary'>Create</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost
