import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import {DUMMY_POST} from '../data'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const CategoryPost = () => {

const {id} = useParams()
const [posts, setPost] = useState([])


  useEffect(()=>{
    const fetchPosts = async () =>{
      try {
        console.log(id)
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${id}`)
        console.log(response)
        setPost(response.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [id])


  return (
    <section className='posts'>
      { posts.length > 0 ?  <div className="container category__posts__container">
        {
          posts.map(({ _id, img, category, desc, creator, title, createdAt }) =>
            <PostItem key={_id} postID={_id} img={img} category={category} title={title} description={desc} creator={creator} createdAt = {createdAt} />)
        }
        </div>: <h1 className='center'>No post found</h1>}
    </section>
  )
}

export default CategoryPost
