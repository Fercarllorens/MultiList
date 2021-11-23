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
  const [userStats, setUserStats] = useState<undefined | Array<number>>(undefined)
  const [barLengths, setBarLengths] = useState<undefined | Array<number>>(undefined)
  const {search} = useLocation()
  const query = new URLSearchParams(search)
  const id_query: any = query.get('id')
  const my_user: any = localStorage.getItem('user_id')
  const uid = id_query != null ? id_query : my_user  
  const myBarTotalPx = 500
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

  function checkFollowed(){
    fetchHandlerCb(`api/get-user?user_id=${my_user}`, "GET", null , setFollow)
  }

  function setFollow(json: any){
    if (json.following != null){
      console.log(json.following)
      let follows = JSON.parse(json.following)
      if (follows.users.includes(uid)){
        setFollowed(true)
      } else {
        setFollowed(false)
      }
    }
    
  }

  function getStatistics() {
    let url = `http://localhost:8000/api/get-statistics?user_id=${uid}`
    fetch(url)
      .then((res) => res.json())
      .then((json) => calculateBars(json))
      .catch((err) => console.error(err))
  }

  function calculateBars(json: string) {
    let array: Array<[any, any]> = []
    let myStats: Array<number> = []
    let barLengths: Array<number> = []

    array = JSON.parse(json)

    console.log(array)

    let totalFilms = array.filter(e => e[1] === "film").length
    totalFilms === 0 ? totalFilms = 1 : totalFilms = totalFilms
    let totalSeries = array.filter(e => e[1] === "series").length
    totalSeries === 0 ? totalSeries = 1 : totalSeries = totalSeries
    let totalSongs = array.filter(e => e[1] === "song").length
    totalSongs === 0 ? totalSongs = 1 : totalSongs = totalSongs
    console.log(totalSongs)

    myStats[0] = array.filter(e => e[0] === "Watching" && e[1] === "film").length
    myStats[1] = array.filter(e => e[0] === "On hold" && e[1] === "film").length
    myStats[2] = array.filter(e => e[0] === "Planning to view" && e[1] === "film").length
    myStats[3] = array.filter(e => e[0] === "Finished" && e[1] === "film").length
    myStats[4] = array.filter(e => e[0] === "Droped" && e[1] === "film").length
    myStats[5] = array.filter(e => e[0] === "Watching" && e[1] === "series").length
    myStats[6] = array.filter(e => e[0] === "On hold" && e[1] === "series").length
    myStats[7] = array.filter(e => e[0] === "Planning to view" && e[1] === "series").length
    myStats[8] = array.filter(e => e[0] === "Finished" && e[1] === "series").length
    myStats[9] = array.filter(e => e[0] === "Droped" && e[1] === "series").length
    myStats[10] = array.filter(e => e[0] === "Watching" && e[1] === "song").length
    myStats[11] = array.filter(e => e[0] === "On hold" && e[1] === "song").length
    myStats[12] = array.filter(e => e[0] === "Planning to view" && e[1] === "song").length
    myStats[13] = array.filter(e => e[0] === "Finished" && e[1] === "song").length
    myStats[14] = array.filter(e => e[0] === "Droped" && e[1] === "song").length

    barLengths[0] = (myStats[0] * myBarTotalPx) / totalFilms
    barLengths[1] = (myStats[1] * myBarTotalPx) / totalFilms
    barLengths[2] = (myStats[2] * myBarTotalPx) / totalFilms
    barLengths[3] = (myStats[3] * myBarTotalPx) / totalFilms
    barLengths[4] = (myStats[4] * myBarTotalPx) / totalFilms
    barLengths[5] = (myStats[5] * myBarTotalPx) / totalSeries
    barLengths[6] = (myStats[6] * myBarTotalPx) / totalSeries
    barLengths[7] = (myStats[7] * myBarTotalPx) / totalSeries
    barLengths[8] = (myStats[8] * myBarTotalPx) / totalSeries
    barLengths[9] = (myStats[9] * myBarTotalPx) / totalSeries
    barLengths[10] = (myStats[10] * myBarTotalPx) / totalSongs
    barLengths[11] = (myStats[11] * myBarTotalPx) / totalSongs
    barLengths[12] = (myStats[12] * myBarTotalPx) / totalSongs
    barLengths[13] = (myStats[13] * myBarTotalPx) / totalSongs
    barLengths[14] = (myStats[14] * myBarTotalPx) / totalSongs

    setUserStats(myStats)
    setBarLengths(barLengths)
  }


  return { uid, spotifyAuth, open, setOpen, pic, data, getUserData, handleSpotifyClick, id_query, follow_user, unfollow_user, followed, show_myFollows, checkFollowed, userStats, barLengths, getStatistics }
}
export default ProfileLogic
