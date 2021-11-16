import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import NavbarLogic from './NavbarLogic'
import './Navbar.css'

const Navbar = () => {
  const { logged, setLogged, checkLoggedIn, handleLogout } = NavbarLogic()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <div className='navbar'>
      <Link className='navbar__logo' to='/'>
        Logo
      </Link>
      {logged ? (
        <div className='navbar__menu'>
          <Link className='navbar__link' to='/SearchUsers'>
            Search Users
          </Link>
          <Link className='navbar__link' to='/MyLists'>
            My Lists
          </Link>
          <Link className='navbar__link' to='/Profile'>
            Profile
          </Link>
          <Link className='navbar__link' to='/' onClick={handleLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div className='navbar__menu'>
          <Link className='navbar__link' to='/login'>
            Login
          </Link>
          <Link className='navbar__link' to='/register'>
            Register
          </Link>
        </div>
      )}
    </div>
  )
}
export default Navbar
