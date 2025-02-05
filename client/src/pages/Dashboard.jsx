import React, { useContext, useEffect, useState } from 'react'
import { DUMMY_POST } from '../data'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Dashboard = () => {
  const [posts, setPosts] = useState(DUMMY_POST)
  const shortPostTitle = posts.title > 10 ? "aaaaaaaaaaaaaaaaa" : posts.title

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

useEffect(()=>{
  if(!token){
    navigate('/login')
  }
},[])

  return (
    <section className='dashboard'>
      {
        posts.length ? <div className='container dashboard__container'>
          {
            posts.map(post=>{
              return <article key={post.id} className='dashboard__post'>
                <div className='dashboard__post-info'>
                  <div className='dashboard__post-thumbnail'>
                    <img src={post.img} alt="" />
                  </div>
                  <h5>{post.title.length > 10 ? `${post.title.substring(0,25)}....` : post.title}</h5>
                </div>
                <div className='dashboard__post-actions'>
                  <Link to={`/posts/${post.id}`} className='btn'>View</Link>
                  <Link to={`/posts/${post.id}/edit`} className='btn sm primary'>Edit</Link>
                  <Link to={`/posts/${post.id}/delete`} className='btn sm danger'>Delete</Link>
                </div>
              </article>
            })
          }
        </div> : <h1 className='center'>No post found</h1>
      }
    </section>
  )
}

export default Dashboard
