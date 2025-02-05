import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'
import avataLogo from '../images/avatar1.jpg'


const Authors = () => {
    const [authors, setAuthors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getAuthors = async () => {
            setIsLoading(true)
            try {
                const respose = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
                setAuthors(respose.data)
                console.log(respose.data)

            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        getAuthors()
    }, [])

    if (isLoading) {
        return <Loader />
    }
    return (
        <section className='authors'>
            {authors.length > 0 ? <div className="container authors__container">
                {
                    authors.map(({ _id, name, posts, avatar }) => {
                        return <Link className='author' key={_id} to={`/posts/users/${_id}`}>
                            <div className="author__avatar">
                                {avatar ? <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={name} /> :
                                    <img src={avataLogo} alt='ddd' />}
                            </div>
                            <div className="author__info">
                                <h4>{name}</h4>
                                <p>{posts} post</p>
                            </div>
                        </Link>
                    })
                }
            </div> : <h1 className='center'>No authors/post found</h1>}

        </section>
    )
}

export default Authors
