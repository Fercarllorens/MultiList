import React, { useEffect } from 'react'
import ProfileLogic from './ProfileLogic'
import './Profile.css'

import Pic from '../Pic/Pic'
import Modal from '../Modal/Modal'

const Profile = () => {
  const { open, setOpen, pic, data, getUserData, handleSpotifyClick } = ProfileLogic()
  const uid = localStorage.getItem('user_id')

  //TODO: MODIFICAR CUANDO SE AÑADA EL LOGIN
  useEffect(() => {
    if (uid !== null) getUserData(uid)
  }, [])

  return (
    <div className='profile-container'>
      <Modal 
        open={open} 
        onClose={() => setOpen(false)} 
        uid={uid} 
        endpoint={"api/put-user"}
        method={"POST"}
        values={[{
          text: "Username",
          type: "string",
          value: "Username",
          api_value: "username",
        },
        {
          text: "Email",
          type: "email",
          value: "email@email.com",
          api_value: "email",
        },]}
      />
      <div className='profile-pic'>
        <img src={pic} alt='Profile Pic' />
      </div>
      <div className='profile-data'>
        <h4>User Info</h4>
        <ul>
          <p>User Name {data ? data.username : 'No disponible'}</p>
          <p>Email {data ? data.email : 'No disponible'}</p>
        </ul>
      </div>
      <div className='profile-settings'>
        <h4>Settings</h4>
        <ul>
          <p onClick={() => {setOpen(!open)}}>Update Profile</p>
        </ul>
      </div>
      <div className='profile-linked-accounts'>
        <h4>Link Accounts</h4>
        <button onClick={() => {if (uid !== null) handleSpotifyClick(uid)}} >Spotify</button>
      </div>
    </div>
  )
}
export default Profile
