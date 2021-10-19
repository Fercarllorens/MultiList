import React from 'react'
import ProfileLogic from './ProfileLogic'
import './Profile.css'

interface Props {
  ID: string
}

const Profile: React.FC<Props> = (props) => {
  const {} = ProfileLogic(props)

  return <div></div>
}
export default Profile
