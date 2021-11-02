import { useState } from 'react'
import { fetchHandler, fetchHandlerCb } from '../fetchHandler'

interface User{
  username: string;
  premium: boolean;
}

const NavbarLogic = () => {
  const [logged, setLogged] = useState(false)
  const [user, setUser] =   useState<null | User>(null)
  const [openCustomListModal, setOpenCustomListModal] = useState<boolean>(false)

  const checkLoggedIn = () => {
    // function to check if the user is logged in, then display different functionalities
    localStorage.getItem('user_id') ? setLogged(true) : setLogged(false)
  }

  const handleLogout = () => {
    // function to log out the user
    localStorage.removeItem('user_id')
    setLogged(false)
  }

  const getUser = () => {
    return fetchHandlerCb(`api/get-user?user_id=${localStorage.getItem('user_id')}`, 'GET', {}, processUser)
  }

  function processUser(json: any){
    setUser(json)
}

  return { logged, user, openCustomListModal, setLogged, checkLoggedIn, handleLogout, getUser, setOpenCustomListModal }
}
export default NavbarLogic
