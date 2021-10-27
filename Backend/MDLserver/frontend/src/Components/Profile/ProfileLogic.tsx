import { request } from 'http'
import React, { useState } from 'react'

interface Data {
  username: string
  email: string
}

const ProfileLogic = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [pic, setPic] = useState<undefined | string>(undefined)
  const [data, setData] = useState<null | Data>(null)

  function handleSpotifyClick(uid: string){ 
    let url = `http://localhost:8000/spotify/get-auth-url?user_id=${uid}`
    fetch(url)
      .then(res=>res.json())
      .then(json=>window.location.href = json.url)
  }

  function getUserData(uid: string){
    let url = `http://localhost:8000/api/get-user?user_id=${uid}`
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
  }

  return { open, setOpen, pic, data, getUserData, handleSpotifyClick}
}
export default ProfileLogic
