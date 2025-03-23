import React, { useEffect, useState } from 'react'
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
        const selectedPosts = response.data.slice(4, 12);
        setPost(selectedPosts)
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
