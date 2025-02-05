import React from 'react'
import { Link } from 'react-router-dom'
import img from '../images/blog1.jpg'

const FeaturePoset = () => {
  return (
    <div className="container featured__post">
    <div className="main_featured">
    <article className='post main_featured_poat'>
        <div className="post__thumbnail">
            <img src={img} alt='' />
        </div>
        <div className="post__content">
            <Link to = {`/`}>
                <h3>ffff</h3>
            </Link>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, tempora.</p>
            <div className="post__footer">
            {/* <PostAuthor creator = {creator} createdAt = {createdAt}/> */}
            <div className='post__footer__category'>

            <Link to={'/'}>555</Link>
            </div>
            </div>

        </div>
    </article>
    </div>
    <div className="secoundery_feature">
    <article className='posta'>
        <div className="post__thumbnail">
            <img src={img} alt='' />
        </div>
        <div className="post__content">
            <Link to = {`/`}>
                <h3>ffff</h3>
            </Link>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, tempora.</p>
            <div className="post__footer">
            {/* <PostAuthor creator = {creator} createdAt = {createdAt}/> */}
            <div className='post__footer__category'>

            <Link to={'/'}>555</Link>
            </div>
            </div>

        </div>
    </article>
    <article className='posta'>
        <div className="post__thumbnail">
            <img src={img} alt='' />
        </div>
        <div className="post__content">
            <Link to = {`/`}>
                <h3>ffff</h3>
            </Link>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, tempora.</p>
            <div className="post__footer">
            {/* <PostAuthor creator = {creator} createdAt = {createdAt}/> */}
            <div className='post__footer__category'>

            <Link to={'/'}>555</Link>
            </div>
            </div>

        </div>
    </article>
    <article className='posta'>
        <div className="post__thumbnail">
            <img src={img} alt='' />
        </div>
        <div className="post__content">
            <Link to = {`/`}>
                <h3>ffff</h3>
            </Link>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, tempora.</p>
            <div className="post__footer">
            {/* <PostAuthor creator = {creator} createdAt = {createdAt}/> */}
            <div className='post__footer__category'>

            <Link to={'/'}>555</Link>
            </div>
            </div>

        </div>
    </article>
    </div>
  </div>
  )
}

export default FeaturePoset
