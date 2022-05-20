import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

import { Link } from 'react-router-dom'
 
const Header = () => {
  return (
    <header className='header'>
        <div className='logo'>
            <Link className='main' to='/'>Rock the Vote</Link>
        </div>
        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt /> Login
                </Link>
            </li>
        </ul>
        <ul>
            <li>
                <Link to='/register'>
                    <FaUser /> Sign Up
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header