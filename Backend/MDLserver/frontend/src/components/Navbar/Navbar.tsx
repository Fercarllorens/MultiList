import React, { useEffect } from 'react'
import NavbarLogic from './NavbarLogic'

const Navbar = () => {
  const { logged, setLogged, checkLoggedIn, handleLogout } = NavbarLogic()

  useEffect(() => {
    checkLoggedIn()
  }, [])

  return <div class='navbar'></div>
}
export default Navbar
