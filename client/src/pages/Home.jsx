import React from 'react'
import Post from '../components/Post'
import { Link } from 'react-router-dom'
import FeaturePost from '../components/FeaturePost'


const Home = () => {
  return (
    <>
      {/* <div className='container header_category'>
        <div className="main_category_item">
          <a href=''>All</a>
          <a href=''>Web design</a>
          <a href=''>Database</a>
          <a href=''> Development</a>
          <a href=''> Mercketing</a>
        </div>
      </div> */}
      <FeaturePost/>
      <Post />
    </>
  )
}

export default Home
