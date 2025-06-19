import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className='footer__categories'>
        <li><Link to={"/posts/categories/technology"}>Technology</Link></li>
        <li><Link to={"/posts/categories/social-media"}>Social Media</Link></li>
        <li><Link to={"/posts/categories/entertainment"}>Entertainment</Link></li>
        <li><Link to={"/posts/categories/business"}>Business</Link></li>
        {/* <li><Link to={"/posts/categories/Art"}>Art</Link></li> */}
        <li><Link to={"/posts/categories/it"}>IT</Link></li>
        <li><Link to={"/posts/categories/Weather"}>Weather</Link></li>
      </ul>

      <div className="footer__copyright">
        <small>All right reserved &copy; Copyright, kavindu</small>
      </div>
    </footer>
  )
}

export default Footer
