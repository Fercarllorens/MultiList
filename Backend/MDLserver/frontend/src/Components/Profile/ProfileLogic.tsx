import { request } from 'http'
import React, { useState } from 'react'
import { fetchHandler, fetchHandlerCb } from '../fetchHandler'
import { useLocation } from 'react-router';
import { useHistory } from 'react-router';
import { History } from 'history';
interface Data {
  username: string
  email: string
}

const ProfileLogic = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [pic, setPic] = useState<undefined | string>(undefined)
  const [followed, setFollowed] = useState<boolean>(false)
  const [data, setData] = useState<null | Data>(null)
  const [spotifyAuth, setSpotifyAuth] = useState<boolean>(false)
  const {search} = useLocation()
  const query = new URLSearchParams(search)
  const id_query: any = query.get('id')
  const my_user: any = localStorage.getItem('user_id')
  const uid = id_query != null ? id_query : my_user
  let history = useHistory()

  function handleSpotifyClick(){
    let url = `http://localhost:8000/spotify/get-auth-url?user_id=${uid}`
    fetch(url)
      .then(res=>res.json())
      .then(json=>window.location.href = json.url)
  }

  function getUserData(){
    let url = `http://localhost:8000/api/get-user?user_id=${uid}`
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))

      fetchHandler(`spotify/is-auth?user_id=${uid}`, 'GET', null)
      .then((obj:any) => {
        setSpotifyAuth(obj)
      })
  }

  function follow_user(){
    let body = {
      id: my_user,
      follow_id: uid
    }
    fetchHandlerCb(`api/update-follow`, "POST", body, refreshFollow)
    return false;
  }

  function unfollow_user(){
    let body = {
      id: my_user,
      follow_id: uid
    }
    fetchHandlerCb(`api/delete-follow`, "POST", body, refreshFollow)
    return false;
  }

  function refreshFollow(){
    if (followed){
      setFollowed(false)
    } else{
      setFollowed(true)
    }  
  }

  function show_myFollows() {  
    history.push({
        pathname:'/MyFollows'
     })

}

  return { uid, spotifyAuth, open, setOpen, pic, data, getUserData, handleSpotifyClick, id_query, follow_user, unfollow_user, followed, show_myFollows}
}
export default ProfileLogic
