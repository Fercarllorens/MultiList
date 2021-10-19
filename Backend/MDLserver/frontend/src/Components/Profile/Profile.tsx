import React, { useEffect } from 'react'
import ProfileLogic from './ProfileLogic'
import './Profile.css'

import Pic from '../Pic/Pic'

const Profile = () => {
  const { pic, data, getUserData } = ProfileLogic()

  //TODO: MODIFICAR CUANDO SE AÑADA EL LOGIN
  useEffect(() => {
    getUserData('id')
  }, [])

  return (
    <div className='profile-container'>
      <div className='profile-pic'>
        <img src={pic} alt='Profile Pic' />
      </div>
      <div className='profile-data'>
        <h4>User Info</h4>
        <ul>
          <p>Info1 {data ? data.name : 'No disponible'}</p>
          <p>Info2 {data ? data.email : 'No disponible'}</p>
        </ul>
      </div>
      <div className='profile-settings'>
        <h4>Settings</h4>
        <ul>
          <p>Setting1</p>
          <p>Setting2</p>
          <p>Setting3</p>
          <p>Setting4</p>
        </ul>
      </div>
    </div>
  )
}
export default Profile
