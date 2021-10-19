import React, { useState } from 'react'

interface Data {
  name: string
  email: string
}

const ProfileLogic = () => {
  const [pic, setPic] = useState<undefined | string>(undefined)
  const [data, setData] = useState<null | Data>(null)

  const getUserData = (uid: string) => {
    let url = `http://localhost:8000/api/get-user?id=${uid}`
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
  }

  return { pic, data, getUserData }
}
export default ProfileLogic
