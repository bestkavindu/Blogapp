import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const[error, setError] = useState()

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

useEffect(()=>{
  document.title = 'Create Post';
  if(!token){
    navigate('/login')
  }
},[])

  const POST_CATEGORIES = ["Agriculture", "Education", "Art", "Invesment", "Weather","IT"]

  const createPost = async(e)=>{
    e.preventDefault()

    const formdata = new FormData();
    formdata.set('title', title)
    formdata.set('category', category)
    formdata.set('desc', desc)
    formdata.set('img', img)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, formdata, {withCredentials:true,
        headers: {Authorization: `Bearer ${token}`}})
        if(response.status == 201){
          return navigate('/')
        }
    }
      catch (error) {
      setError(error.response.data.message)
    }

  }

  return (
    <section className="section create-opost">
      <div className="container">
        <h2>Create post</h2>
       {error && <p className='form__error-message'>{error}</p>}
        <form action="" className="form create-post__form" onSubmit={createPost}>
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

export default CreatePost
