import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostItem = ({postID, category, title, description, creator, img, createdAt}) => {
    const shortDesc = description.length >145 ? description.substr(0,145)+ '...': description
    const shortTitle = title.length >30 ? title.substr(0,30)+ '...': title
    return (
        <article className='post'>
            <div className="post__thumbnail">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${img}`} alt={title} />
            </div>
            <div className="post__content">
                <Link to = {`/posts/${postID}`}>
                    <h3>{shortTitle}</h3>
                </Link>
                <p dangerouslySetInnerHTML={{__html:shortDesc}}></p>
                <div className="post__footer">
                <PostAuthor creator = {creator} createdAt = {createdAt}/>
                <div className='post__footer__category'>

                <Link  to={`/posts/categories/${category}`}>{category}</Link>
                </div>
                </div>

            </div>
        </article>
    )
}

export default PostItem
