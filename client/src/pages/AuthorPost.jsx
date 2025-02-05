import React, { useContext, useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import {DUMMY_POST} from '../data'
import { UserContext } from '../context/userContext'
import Loader from '../components/Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const AuthorPost = () => {
  const {id} = useParams()
  const [posts, setPost] = useState([])
    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const getPost = async ()=>{
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`)
        setPost(response.data)
        console.log(response.data)
        console.log(response.data.length)
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }
    getPost()
  },[])


  if(isLoading){
    return <Loader/>
  }
  return (
    <section className='posts'>
      {posts.length > 0 ? <div className="container posts__container">
        {
          posts.map(({ _id, img, category, desc, creator, title, createdAt }) =>
            <PostItem key={_id} postID={_id} img={img} category={category} title={title} description={desc} creator={creator} createdAt = {createdAt} />)
        }
      </div> : <h1 className='center'>No post found</h1>}
    </section>
  )
}

export default AuthorPost
