import React, { useEffect, useState } from 'react'

import Img1 from '../images/blog1.jpg'
import Img2 from '../images/blog2.jpg'
import Img3 from '../images/blog3.jpg'
import Img4 from '../images/blog4.jpg'
import PostItem from './PostItem'
import Loader from './Loader'

import axios from 'axios'


const Post = () => {
  const [posts, setPost] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
        console.log(response.data)
        setPost(response?.data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetchPost()
  }, [])
  if (loading) {
    return <Loader />
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

export default Post
