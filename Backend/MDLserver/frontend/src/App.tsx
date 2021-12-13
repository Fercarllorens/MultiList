import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Profile from './Components/Profile/Profile'
import Finder from './Components/Finder/Finder'
import MyLists from './Components/MyLists/MyLists'
import MultimediaContent from './Components/MultimediaContent/MultimediaContent'
import ListContent from './Components/ListContent/ListContent'
import Spotify from './Components/Spotify/Spotify'
import UserFinder from './Components/UserFinder/UserFinder'
import MyFollows from './Components/MyFollows/MyFollows'
import Casting from './Components/Casting/Casting'
import { fetchHandler } from './Components/fetchHandler'
import Artist from './Components/Artist/Artist'
import Categories from './Components/Categories/Categories'
import MyFollowsLogic from './Components/MyFollows/MyFollowsLogic'
import Tops from './Components/Tops/Tops'
import LandingPage from './Components/LandingPage/LandingPage'
import './App.css'

function App() {

  useEffect(() => {
    const user_id: string | null = localStorage.getItem('user_id')
    if (user_id) { fetchHandler(`spotify/is-auth?user_id=${user_id}`, 'GET', null); }
  }, [])

  return (
    <Router>
      <Navbar />
      <Switch>
        {/*Todo las rutas que haya que meter, se meten aqui como una Route*/}
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute path='/Spotify' component={Spotify} />
        <Route path='/MultimediaContent' component={MultimediaContent} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/MyFollows' component={MyFollows} />
        <PrivateRoute path='/MyLists' component={MyLists} />
        <PrivateRoute path='/List' component={ListContent} />
        <PrivateRoute path='/Categories' component={Categories} />
        <Route path='/Artist' component={Artist} />
        <Route path='/Tops' component={Tops} />
        <PrivateRoute path='/SearchUsers' component={UserFinder} />
        <PrivateRoute path='/Cast' component={Casting} />
        <PrivateRoute path='/Finder' component={Finder} />
        <Route path="*" component={() => { return <div>404 NOT FOUND</div> }} />
      </Switch>
    </Router>
  )
}

export default App
