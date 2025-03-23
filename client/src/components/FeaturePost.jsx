import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img from '../images/blog1.jpg'
import img1 from '../images/blog2.jpg'
import axios from 'axios'
import PostAuthor from './PostAuthor'

const FeaturePoset = () => {

    const [post, setPost] = useState({})
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [desc, setDesc] = useState("")
    const [creator, setCreator] = useState()
    const shortDesc = desc.length > 145 ? desc.substr(0, 255) + '....' : desc

    useEffect(() => {
        const fetchFeaturedPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
                const selectedPost = response.data[0]
                const selectedPosts = response.data.slice(1, 4);
                setPost(selectedPost)
                setPosts(selectedPosts)
                setDesc(selectedPost.desc)
                setCreator(selectedPost.creator)


            } catch (error) {

                console.log(error)
            }
        }
        fetchFeaturedPost()
    }, [])
    return (
        <div className="container featured__post">
            <div className="main_featured">
                <article className='post main_featured_poat'>
                    <div className="post__thumbnail">
                        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.img}`} alt='' />
                    </div>
                    <div className="post__content">
                        <Link to={`/posts/${post._id}`}>
                            <h3>{post.title}</h3>
                        </Link>
                        <p dangerouslySetInnerHTML={{ __html: shortDesc }}></p>
                        <div className="post__footer">
                            {creator && <PostAuthor creator={creator} createdAt={post.createdAt} />}
                            <div className='post__footer__category'>

                                <Link to={`/posts/categories/${post.category}`}>{post.category}</Link>
                            </div>
                        </div>

                    </div>
                </article>
            </div>
            <div className="secoundery_feature">

                {posts.map(({ _id, img, category, desc, creator, title, createdAt }) =>
                    <article className='posta' key={_id}>
                        <div className="post__thumbnail">
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${img}`} alt='' />
                        </div>
                        <div className="post__content">
                            <Link to={`/posts/${_id}`}>
                                <h3>{title}</h3>
                            </Link>
                            <p dangerouslySetInnerHTML={{ __html: desc.substring(0, 180) }}></p>
                            <div className="post__footer">
                                <PostAuthor creator={creator} createdAt={createdAt} />
                                <div className='post__footer__category'>

                                    <Link to={`/posts/categories/${category}`}>{category}</Link>
                                </div>
                            </div>

                        </div>
                    </article>
                )}

            </div>
        </div>
    )
}

export default FeaturePoset
