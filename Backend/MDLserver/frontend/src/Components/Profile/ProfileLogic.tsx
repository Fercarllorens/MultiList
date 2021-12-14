import React, { useState } from 'react'
import { fetchHandler, fetchHandlerCb } from '../fetchHandler'
import { useLocation } from 'react-router';
import { useHistory } from 'react-router';

interface Data {
  username: string
  email: string
  categories: string
  following: string;
  id: number;
  lists: string;
  password: string;
  premium: boolean;
  spotify_token: string;
}

const ProfileLogic = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [pic, setPic] = useState<undefined | string>(undefined)
  const [followed, setFollowed] = useState<boolean>(false)
  const [data, setData] = useState<null | Data>(null)
  const [spotifyAuth, setSpotifyAuth] = useState<boolean>(false)
  const [userStats, setUserStats] = useState<undefined | Array<number>>(undefined)
  const [filmsCategories, setFilmsCategories] = useState<null | any[]>(null)
  const [seriesCategories, setSeriesCategories] = useState<null | any[]>(null)
  const [songsCategories, setSongsCategories] = useState<null | any[]>(null)
  const [filter, setFilter] = useState<string>("Film")
  const [categoryFilter, setCategoryFilter] = useState<string>("Film")
  // const [barLengths, setBarLengths] = useState<undefined | Array<number>>(undefined)
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const id_query: any = query.get('id')
  const my_user: any = localStorage.getItem('user_id')
  const uid = id_query != null ? id_query : my_user
  // const myBarTotalPx = 500
  let history = useHistory()

  function handleSpotifyClick() {
    let url = `http://localhost:8000/spotify/get-auth-url?user_id=${uid}`
    fetch(url)
      .then(res => res.json())
      .then(json => window.location.href = json.url)
  }

  function getUserData() {
    let url = `http://localhost:8000/api/get-user?user_id=${uid}`
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json)

      })
      .catch((err) => console.error(err))

    if (uid === my_user) {
      fetchHandler(`spotify/is-auth?user_id=${uid}`, 'GET', null)
        .then((obj: any) => {
          setSpotifyAuth(obj)
        })
    }
  }

  function follow_user() {
    let body = {
      id: my_user,
      follow_id: uid
    }
    fetchHandlerCb(`api/update-follow`, "POST", body, refreshFollow)
    return false;
  }

  function unfollow_user() {
    let body = {
      id: my_user,
      follow_id: uid
    }
    fetchHandlerCb(`api/delete-follow`, "POST", body, refreshFollow)
    return false;
  }

  function refreshFollow() {
    if (followed) {
      setFollowed(false)
    } else {
      setFollowed(true)
    }
  }

  function show_myFollows() {
    history.push({
      pathname: '/MyFollows'
    })

  }

  function checkFollowed() {
    fetchHandlerCb(`api/get-user?user_id=${my_user}`, "GET", null, setFollow)
  }

  function setFollow(json: any) {
    if (json.following != null) {
      let follows = JSON.parse(json.following)
      if (follows.users.includes(uid)) {
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
      .then((json) => setUserStats(JSON.parse(json)))
      .catch((err) => console.error(err))
  }

  function handleFilters(e: any) {
    let current_filter = e.currentTarget.innerHTML
    setFilter(current_filter)
    switch(current_filter){
      case 'Film':
        setSelectedCategories(filmsCategories); break;
      case 'Series':
        setSelectedCategories(seriesCategories); break;
      case 'Song':
        setSelectedCategories(songsCategories); break;
    }
  }

  function handleCategoryFilters(e: any) {
    let current_filter = e.currentTarget.innerHTML
    setCategoryFilter(current_filter)
    switch(current_filter){
      case 'Film':
        setSelectedCategories(filmsCategories); break;
      case 'Series':
        setSelectedCategories(seriesCategories); break;
      case 'Song':
        setSelectedCategories(songsCategories); break;
    }
    console.log('CAMBIADAS CATEGORIAS')
    console.log(current_filter)
    console.log(selectedCategories)
  }

  function getFilmCategories(){
    fetchHandler(`api/get-categories-by-type?type=film`, 'GET', null)
        .then((obj:any) => {
            if(obj!==undefined){ 
                const filmsCategoriesArray = JSON.parse(obj)
                setFilmsCategories(filmsCategoriesArray)
            }
        })
  }

  function getSeriesCategories(){
      fetchHandler(`api/get-categories-by-type?type=series`, 'GET', null)
          .then((obj:any) => {
              if(obj!==undefined){ 
                  const seriesCategoriesArray = JSON.parse(obj)
                  setSeriesCategories(seriesCategoriesArray)
              }
          })
  }

  function setSelectedCategoriesType(type: string){
    switch(type){
      case 'Film':
        setSelectedCategories(filmsCategories); break;
      case 'Series':
        setSelectedCategories(seriesCategories); break;
      case 'Song':
        setSelectedCategories(songsCategories); break;
    }
  }

  function getSongsCategories(){
      fetchHandler(`api/get-categories-by-type?type=song`, 'GET', null)
          .then((obj:any) => {
              if(obj!==undefined){ 
                  const songsCategoriesArray = JSON.parse(obj)
                  setSongsCategories(songsCategoriesArray)
              }
          })
  }

  return {
    uid, spotifyAuth, open, setOpen, pic, data, getUserData, handleSpotifyClick, id_query,
    follow_user, unfollow_user, followed, show_myFollows, checkFollowed, userStats, getStatistics,
    filter, handleFilters, categoryFilter, handleCategoryFilters, filmsCategories, getFilmCategories,
    seriesCategories, getSeriesCategories, songsCategories, getSongsCategories, selectedCategories
  }
}
export default ProfileLogic
