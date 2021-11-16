import React, { useEffect } from 'react'
import ProfileLogic from './ProfileLogic'
import './Profile.css'

import Modal from '../Modal/Modal'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { uid, spotifyAuth, open, setOpen, pic, data, getUserData, handleSpotifyClick, id_query, follow_user, unfollow_user, followed, show_myFollows } = ProfileLogic()
  //TODO: MODIFICAR CUANDO SE AÑADA EL LOGIN
  useEffect(() => {
    getUserData()
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
        <img className="profile-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXKo36JFQDLpzs9giWMBSBEKgmjDNsXd7cA&usqp=CAU" alt='Profile Pic' />
      </div>
      <div className='profile-data'>
        <h4>User Info</h4>
        <ul>
          <p>User Name {data ? data.username : 'No disponible'}</p>
          <p>Email {data ? data.email : 'No disponible'}</p>
        </ul>
      </div>
    { 
      uid == localStorage.getItem('user_id') ? 
        <>
            <div className='profile-settings'>
                  <h4>Settings</h4>
                  <ul>
                    <p className="update-profile" onClick={() => { setOpen(!open) } }>Update Profile</p>
                  </ul>
            </div>
            <div className='profile-linked-accounts'>
                <h4>Link Accounts</h4>
                {spotifyAuth
                  ? <p className='profile-linked-spotify'>Spotify - Linked</p>
                  : <button onClick={handleSpotifyClick} className="profile-linked-spotify">Spotify</button>}
            </div>
            <Link className="my-follows-btn" to="/MyFollows">My Follows</Link>
        </> : 
        <>
          {
            !followed ?
            <button className="follow-btn" onClick={() => follow_user()}>
                follow
            </button>:
            <button className="follow-btn" onClick={() => unfollow_user()}>
                unfollow
            </button>
          }
        </>
    }
    
    </div>
  )
}
export default Profile
