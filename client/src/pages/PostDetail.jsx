import React, { useContext, useEffect, useState } from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams } from 'react-router-dom'
import Thmumbnail from '../images/blog20.jpg'
import {UserContext} from '../context/userContext.js'
import DeletePost from './DeletePost.jsx'
import Loader from '../components/Loader'
import axios from 'axios'

const PostDetail = () => {

  const {id} = useParams()
  const [post, setPost] = useState([])
  const[creatorID, setCreatorID] = useState(null)
  const[error, setError] = useState(null)
  const[isLoading, setIsLoading] = useState(false)

  const {currentUser} = useContext(UserContext)

  useEffect(()=>{
    const getPost = async ()=>{
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setPost(response.data)

        setCreatorID(response.data.creator)
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
    <div className='post-detail'>
      {error && <div className="error">{error}</div>}
      {<div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor creator = {post.creator} createdAt={post.createdAt}/>

          {currentUser?.id === post?.creator && <div className="post-detail__button">
            <Link to={`/posts/${id}/edit`} className='btn sm primary'>Edit</Link>
            <DeletePost postID = {post._id}/>
          </div>}
          
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail__thumbnail">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.img}`} alt="" />
        </div>
            <p dangerouslySetInnerHTML={{__html:post.desc}}></p>
      </div>}
    </div>
  )
}

export default PostDetail
