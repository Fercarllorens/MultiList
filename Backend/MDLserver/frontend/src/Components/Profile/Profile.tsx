import React, { useEffect } from 'react'
import ProfileLogic from './ProfileLogic'
import StatisticsBar from '../StatisticsBar/StatisticsBar'
import './Profile.css'

import Modal from '../Modal/Modal'
import { Link } from 'react-router-dom'
import { type } from 'os'

const Profile = () => {
  const { uid, spotifyAuth, open, setOpen, pic, data, getUserData, handleSpotifyClick, id_query,
    follow_user, unfollow_user, followed, show_myFollows, checkFollowed, userStats, getStatistics,
    filter, handleFilters, categoryFilter, handleCategoryFilters } = ProfileLogic()

  useEffect(() => {
    if (uid != localStorage.getItem('user_id')) {
      checkFollowed()
    }
    getUserData()
    getStatistics()
  }, [])

  return (
    <div className='profile-container'>
      <Modal
        title="Modify Account"
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
      <div className='profile-data'>
        <div className='profile-pic'>
          <img className="profile-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXKo36JFQDLpzs9giWMBSBEKgmjDNsXd7cA&usqp=CAU" alt='Profile Pic' />
          <div className='profile-settings'>
            <h4 onClick={() => { setOpen(!open) }}>Settings</h4>
          </div>
        </div>
        <div className='profile-data-contents'>
          <h2>{data?.username}</h2>
          <div className='profile-line'></div>
          <p>following: {data && JSON.parse(data.following).users.length}</p>
          {
            uid == localStorage.getItem('user_id') &&
            <Link className="my-follows-btn" to="/MyFollows">My Follows</Link>
          }
        </div>
      </div>
      {
        //If Yourself -> Show settings
        uid == localStorage.getItem('user_id') ?
          <div className='profile-user-options'>

            <div className='profile-linked-accounts'>
              <h4>Accounts</h4>
              {spotifyAuth
                ? <p className='profile-linked-acc spotify'>Spotify - Linked</p>
                : <button onClick={handleSpotifyClick} className="profile-linked-acc spotify">Spotify</button>}
            </div>
          </div> :
          <div className="follow-btn-holder">
            {
              !followed ?
                <button className="follow-btn" onClick={() => follow_user()}>
                  follow
                </button> :
                <button className="follow-btn" onClick={() => unfollow_user()}>
                  unfollow
                </button>
            }
          </div>
      }
      <div className="profile-statistics-container">
        <ul className="profile-statistics mylist-filter">
          <li className={filter === "Film" ? 'liactive' : ''} onClick={handleFilters}>Film</li>
          <li className={filter === "Series" ? 'liactive' : ''} onClick={handleFilters}>Series</li>
          <li className={filter === "Song" ? 'liactive' : ''} onClick={handleFilters}>Song</li>
        </ul>
        <div className="profile-statistics-line"></div>
        {userStats && filter && (
          <StatisticsBar type={filter.toLowerCase()} name={filter} content_arr={userStats} />
        )}
      </div>
      <div className="profile-categories-container">
        <ul className="profile-statistics mylist-filter">
          <li className={categoryFilter === "Film" ? 'liactive' : ''} onClick={handleCategoryFilters}>Film</li>
          <li className={categoryFilter === "Series" ? 'liactive' : ''} onClick={handleCategoryFilters}>Series</li>
          <li className={categoryFilter === "Song" ? 'liactive' : ''} onClick={handleCategoryFilters}>Song</li>
        </ul>
        <div className="profile-categories-line"></div>
        {/*userStats && filter && (
          <StatisticsBar type={filter.toLowerCase()} name={filter} content_arr={userStats} />
        )*/}
      </div>
    </div>
    
  )
}
export default Profile
