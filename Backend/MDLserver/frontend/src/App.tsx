import React from 'react'
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
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/*Todo las rutas que haya que meter, se meten aqui como una Route*/}
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute path='/Spotify' component={Spotify} />
        <Route path='/MultimediaContent' component={MultimediaContent} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/MyLists' component={MyLists} />
        <PrivateRoute path='/List' component={ListContent} />
        <PrivateRoute path='/' component={Finder} />
        <Route path="*" component={() => {return <div>404 NOT FOUND</div>}} />
      </Switch>
    </Router>
  )
}

export default App
