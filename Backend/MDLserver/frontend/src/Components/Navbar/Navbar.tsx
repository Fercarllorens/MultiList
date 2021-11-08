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
          text: "Name",
          type: "string",
          value: "",
          api_value: "name",
        },
        {
          text: "Type",
          type: "string",
          value: "",
          api_value: "content_type",
        },]}
        opt_values={[{
          value : uid != null ? uid : "",
          api_value : "user_id",
        },
        {
          value : "1",
          api_value : "custom",
        }
        ]}
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
