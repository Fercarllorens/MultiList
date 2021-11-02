import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import NavbarLogic from './NavbarLogic'
import './Navbar.css'
import Modal from '../Modal/Modal'

const Navbar = () => {
  const { logged, user, openCustomListModal, setLogged, checkLoggedIn, handleLogout, getUser, setOpenCustomListModal } = NavbarLogic()
  const uid = localStorage.getItem('user_id')

  useEffect(() => {
    checkLoggedIn()
    getUser()
  }, [])

  return (
    <div className='navbar'>
      <Link className='navbar__logo' to='/'>
        Logo
      </Link>
      <Modal 
        open={openCustomListModal} 
        onClose={() => setOpenCustomListModal(false)} 
        uid={uid} 
        endpoint={"api/post-list"}
        method={"POST"}
        values={[{
          text: "List name",
          type: "string",
          value: "name",
          api_value: "name",
        },
        {
          text: "Type",
          type: "string",
          value: "type",
          api_value: "type",
        },]}
      />
      <button onClick={() => {setOpenCustomListModal(!openCustomListModal)}} >Create new Custom List </button>
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
