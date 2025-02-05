import React, { useState } from 'react'
import PostItem from '../components/PostItem'

import {DUMMY_POST} from '../data'
const CategoryPost = () => {
  const [posts, setPost] = useState(DUMMY_POST)
  return (
    <section className='posts'>
      { posts.length > 0 ?  <div className="container category__posts__container">
        {
            posts.map(({id, img, category, description, aurthorId, title}) => 
            <PostItem key={id} postID={id} img = {img} category = {category} title = {title} description = {description}  aurthorId = {aurthorId}/>)
        }
        </div>: <h1 className='center'>No post found</h1>}
    </section>
  )
}

export default CategoryPost
