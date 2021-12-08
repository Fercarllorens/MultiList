import React, { useEffect } from 'react'
import ProfileLogic from './ProfileLogic'
import './Profile.css'

import Modal from '../Modal/Modal'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { uid, spotifyAuth, open, setOpen, pic, data, getUserData, handleSpotifyClick, id_query, follow_user, unfollow_user, followed, 
          show_myFollows, checkFollowed, userStats, barLengths, getStatistics, filmsCategories, seriesCategories, songsCategories,
          getFilmCategories, getSeriesCategories, getSongsCategories } = ProfileLogic()
  //TODO: MODIFICAR CUANDO SE AÑADA EL LOGIN
  useEffect(() => {
    if( uid != localStorage.getItem('user_id')){
      checkFollowed()
    }
    getUserData()
    getStatistics()
    getFilmCategories()
    getSeriesCategories()
    getSongsCategories()
  }, [])

  const styleFinishedFilms = {
    backgroundColor: 'blue',
    width: barLengths === undefined ? 10 : barLengths[3],    
    height: 17,
    borderRadius: 10
  };

  const styleWatchingFilms = {
    backgroundColor: 'green',
    width: barLengths === undefined ? 0 : barLengths[0],    
    height: 17,
    borderRadius: 10
  };

  const styleOnHoldFilms = {
    backgroundColor: 'yellow',
    width: barLengths === undefined ? 0 : barLengths[1],    
    height: 17,
    borderRadius: 10
  };
  
  const styleDroppedFilms = {
    backgroundColor: 'red',
    width: barLengths === undefined ? 0 : barLengths[4],    
    height: 17,
    borderRadius: 10
  };

  const stylePlanningToWatchFilms = {
    backgroundColor: 'grey',
    width: barLengths === undefined ? 0 : barLengths[2],    
    height: 17,
    borderRadius: 10
  };

  const styleFinishedSeries = {
    backgroundColor: 'blue',
    width: barLengths === undefined ? 0 : barLengths[8],    
    height: 17,
    borderRadius: 10
  };

  const styleWatchingSeries = {
    backgroundColor: 'green',
    width: barLengths === undefined ? 0 : barLengths[5],    
    height: 17,
    borderRadius: 10
  };

  const styleOnHoldSeries = {
    backgroundColor: 'yellow',
    width: barLengths === undefined ? 0 : barLengths[6],    
    height: 17,
    borderRadius: 10
  };
  
  const styleDroppedSeries = {
    backgroundColor: 'red',
    width: barLengths === undefined ? 0 : barLengths[9],    
    height: 17,
    borderRadius: 10
  };

  const stylePlanningToWatchSeries = {
    backgroundColor: 'grey',
    width: barLengths === undefined ? 0 : barLengths[7],    
    height: 17,
    borderRadius: 10
  };

  const styleFinishedSongs = {
    backgroundColor: 'blue',
    width: barLengths === undefined ? 0 : barLengths[13],    
    height: 17,
    borderRadius: 10
  };

  const styleWatchingSongs = {
    backgroundColor: 'green',
    width: barLengths === undefined ? 0 : barLengths[10],    
    height: 17,
    borderRadius: 10
  };

  const styleOnHoldSongs = {
    backgroundColor: 'yellow',
    width: barLengths === undefined ? 0 : barLengths[11],    
    height: 17,
    borderRadius: 10
  };
  
  const styleDroppedSongs = {
    backgroundColor: 'red',
    width: barLengths === undefined ? 0 : barLengths[14],    
    height: 17,
    borderRadius: 10
  };

  const stylePlanningToWatchSongs = {
    backgroundColor: 'grey',
    width: barLengths === undefined ? 0 : barLengths[12],    
    height: 17,
    borderRadius: 10
  };


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
      <div className='film-statistics-bar'>
        <h1> Films </h1>
        <span className="bar" style={ styleFinishedFilms }></span> 
        <span className="bar" style={ styleWatchingFilms }></span>
        <span className="bar" style={ styleOnHoldFilms }></span>
        <span className="bar" style={ styleDroppedFilms }></span>
        <span className="bar" style={ stylePlanningToWatchFilms }></span>
        <table> 
          <tr>
            <td><span className="blue-dot"/> Finished: { userStats === undefined ? 0 : userStats[3] }</td>
            <td><span className="green-dot"/> Watching: { userStats === undefined ? 0 : userStats[0] }</td>
          </tr>
          <tr>
            <td><span className="yellow-dot"/> On Hold: { userStats === undefined ? 0 : userStats[1] }</td>        
            <td><span className="red-dot"/> Dropped: { userStats === undefined ? 0 : userStats[4] } </td>
            <td><span className="grey-dot"/> Plan To Watch: { userStats === undefined ? 0 : userStats[2] }</td>
          </tr>         
        </table></div>
      <div className='series-statistics-bar'>
        <h1> Series </h1>
        <span className="bar" style={ styleFinishedSeries }></span> 
        <span className="bar" style={ styleWatchingSeries }></span>
        <span className="bar" style={ styleOnHoldSeries }></span>
        <span className="bar" style={ styleDroppedSeries }></span>
        <span className="bar" style={ stylePlanningToWatchSeries }></span>
        <table> 
          <tr>
            <td><span className="blue-dot"/> Finished: { userStats === undefined ? 0 : userStats[8] }</td>
            <td><span className="green-dot"/> Watching: { userStats === undefined ? 0 : userStats[5] }</td>
          </tr>
          <tr>
            <td><span className="yellow-dot"/> On Hold: { userStats === undefined ? 0 : userStats[6] }</td>        
            <td><span className="red-dot"/> Dropped: { userStats === undefined ? 0 : userStats[9] } </td>
            <td><span className="grey-dot"/> Plan To Watch: { userStats === undefined ? 0 : userStats[7] }</td>
          </tr>         
        </table>
      </div>
      
      <div className='songs-statistics-bar'>
        <h1> Songs </h1>
        <span className="bar" style={ styleFinishedSongs }></span> 
        <span className="bar" style={ styleWatchingSongs }></span>
        <span className="bar" style={ styleOnHoldSongs }></span>
        <span className="bar" style={ styleDroppedSongs }></span>
        <span className="bar" style={ stylePlanningToWatchSongs }></span>
        <table> 
          <tr>
            <td><span className="blue-dot"/> Finished: { userStats === undefined ? 0 : userStats[13] }</td>
            <td><span className="green-dot"/> Watching: { userStats === undefined ? 0 : userStats[10] }</td>
          </tr>
          <tr>
            <td><span className="yellow-dot"/> On Hold: { userStats === undefined ? 0 : userStats[11] }</td>        
            <td><span className="red-dot"/> Dropped: { userStats === undefined ? 0 : userStats[14] } </td>
            <td><span className="grey-dot"/> Plan To Watch: { userStats === undefined ? 0 : userStats[12] }</td>
          </tr>         
        </table> 
      </div>
      <div className = 'user-films-categories'>
          <h1> User's Film Categories </h1>
          {
            filmsCategories?.map((element) => (
                data?.categories.includes(element.id) ?
                  <div className="category-name">          
                      {element.name}
                  </div> :
                  <></>
              )
          )
          }
        </div>
        <div className = 'user-series-categories'>
          <h1> User's Series Categories </h1>
          {
            seriesCategories?.map((element) => (
                data?.categories.includes(element.id) ?
                  <div className="category-name">          
                      {element.name}
                  </div> :
                  <></>
              )
          )
          }
        </div>
        <div className = 'user-songs-categories'>
          <h1> User's Songs Categories </h1>
          {
            songsCategories?.map((element) => (
                data?.categories.includes(element.id) ?
                  <div className="category-name">          
                      {element.name}
                  </div> :
                  <></>
              )
            )
          }
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
