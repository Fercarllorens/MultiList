import { useState } from 'react'

const NavbarLogic = () => {
  const [logged, setLogged] = useState(false)

  const checkLoggedIn = () => {
    // function to check if the user is logged in, then display different functionalities
    localStorage.getItem('authToken') ? setLogged(true) : setLogged(false)
  }

  const handleLogout = () => {
    // function to log out the user
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setLogged(false)
  }

  return { logged, setLogged, checkLoggedIn, handleLogout }
}
export default NavbarLogic
