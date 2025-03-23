import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios';

const EditPost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const[error, setError] = useState("")

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  })

useEffect(()=>{
  const getPost = async() =>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
      setTitle(response.data.title)
      setDesc(response.data.desc)
      setCategory(response.data.category)
      setImg(response.data.img)
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  getPost()
},[])

const editPost = async (e) =>{
  e.preventDefault()
  const formdata = new FormData();
  formdata.set('title', title)
  formdata.set('category', category)
  formdata.set('desc', desc)
  formdata.set('img', img)

  try {
    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, formdata, {withCredentials:true,
      headers: {Authorization: `Bearer ${token}`}})
      if(response.status == 200){
        return navigate(`/`)
      }
  }
    catch (error) {
    setError(error.response.data.message)
  }
}

  const POST_CATEGORIES = ["Agriculture", "Education", "Art", "Invesment", "Weather","IT"]

  return (
    <section className="section create-opost">
      <div className="container">
        <h2>Edit post</h2>
        {error && <p className='form__error-message'>{error}</p>}
        <form action="" className="form create-post__form" onSubmit={editPost}>
        <input type="text" placeholder='Title' value={title} onChange={e=>{setTitle(e.target.value)}} autoFocus/>
        <select name="category" value={category} onChange={e=>{setCategory(e.target.value)}} id="">
          {
            POST_CATEGORIES.map(cat=> <option key={cat}>{cat}</option>)
          }
        </select>
        <input type="file" onChange={e=> setImg(e.target.files[0])} accept='png,jpg, jpeg' />
        <ReactQuill theme="snow" value={desc} onChange={setDesc} />
        <button type="submit" className='btn primary'>Update post</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost
