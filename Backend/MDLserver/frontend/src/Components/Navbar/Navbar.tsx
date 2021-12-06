import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import NavbarLogic from './NavbarLogic'
import './Navbar.css'
import Modal from '../Modal/Modal'

const Navbar = () => {
  const { logged, user, premium, openCustomListModal, setLogged, setPremium, checkLoggedIn, checkPremium, handleLogout, getUser, setOpenCustomListModal } = NavbarLogic()
  const uid = localStorage.getItem('user_id')

  useEffect(() => {
    checkLoggedIn()
    getUser()
  }, [])

  return (
    <div className='navbar'>
      <Link className='navbar__logo' to='/' />
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
          type: "Select",
          value: "Select",
          api_value: "content_type",
          select_opts: [{value: "song", text: "Song"}, {value: "film", text: "Film"}, {value: "series", text: "Series"}]
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
      {logged ? (
        <div className='navbar__menu'>
          <Link className='navbar__link' to='/SearchUsers'>
            Search Users
          </Link>
          {premium ? (
            <Link className='navbar__link' to='/Modal' onClick={() => {setOpenCustomListModal(!openCustomListModal)}}>
              New Custom List
            </Link>
          ) : 
            (<></>)
          }
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
        </div>
      )}
      <div className='navbar__line'></div>
    </div>
  )
}
export default Navbar
