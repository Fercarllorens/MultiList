import { request } from 'http'
import React, { useState } from 'react'
import { fetchHandler } from '../fetchHandler'

interface Data {
  username: string
  email: string
}

const ProfileLogic = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [pic, setPic] = useState<undefined | string>(undefined)
  const [data, setData] = useState<null | Data>(null)
  const [spotifyAuth, setSpotifyAuth] = useState<boolean>(false)
  const uid = localStorage.getItem('user_id')

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

  return { uid, spotifyAuth, open, setOpen, pic, data, getUserData, handleSpotifyClick}
}
export default ProfileLogic
