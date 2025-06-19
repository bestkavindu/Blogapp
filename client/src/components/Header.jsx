import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/blog3.jpg'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import { UserContext } from '../context/userContext';

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth>800 ? true : false)
  const {currentUser} = useContext(UserContext)
  const closeNavHandler = ()=>{
    if(window.innerWidth < 800){
      setIsNavShowing(false)
    }
    else{
      setIsNavShowing(true)
    }
  }
  return (
    <nav>
      <div className="container nav__container">

      <Link to="/" className='nav__logo' onClick={closeNavHandler}>
        {/* <img src={Logo} alt='Navbar Logo' /> */}
        <h1>Blogs</h1>

      </Link>
     {currentUser?.id && isNavShowing && <ul className='nav__menu'>
        <li><Link to="/" onClick={closeNavHandler}>Home</Link></li>
        <li><Link to="/profile/:id" onClick={closeNavHandler}>Profile</Link></li>
        <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
        <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
        <li className='login_btn'><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
      </ul>}
      {!currentUser?.id && isNavShowing && <ul className='nav__menu'>
        
        {/* <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li> */}
        <li><Link to={"/posts/categories/technology"} >Technology</Link></li>
        <li><Link to={"/posts/categories/social-media"} >Social Media</Link></li>
        <li><Link to={"/posts/categories/entertainment"} >Entertainment </Link></li>
        <li><Link to={"/posts/categories/business"} >Business</Link></li>
        <li><Link to={"/posts/categories/it"} >IT</Link></li>
        <li className='login_btn'><Link to="/login">Login</Link></li> 
      </ul>}
      <button className='nav__toggle-btn' onClick={e=>setIsNavShowing(!isNavShowing)}>
        {isNavShowing ? <AiOutlineClose/> : <FaBars/>}
      </button>
      </div>
    </nav>
  )
}

export default Header
