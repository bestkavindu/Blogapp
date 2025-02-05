import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Avator from '../images/avatar1.jpg'
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({ creator, createdAt }) => {

  const [author, setAuthor] = useState({})


  useEffect(() => {
    const getAuthor = async () => {
      try {
        const responce = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${creator}`)
        setAuthor(responce?.data)
        console.log(responce.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAuthor()
  }, [])
  return (
    <div className="author__container">
      <Link to={`/posts/users/${creator}`}>
        <div className="post__author-avatar">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`} alt="" />
        </div>
        <div className="post__aurthor-details">
          <h4>By: {author.name}</h4>
          {/* <h5><ReactTimeAgo date={new Date(createdAt) } locale = 'en-US'></ReactTimeAgo></h5> */}
          <h5>{createdAt}</h5>
        </div>
      </Link>
    </div>
  )
}

export default PostAuthor
