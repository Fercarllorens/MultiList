import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Profile from './Components/Profile/Profile'
import Finder from './Components/Finder/Finder'
import MyLists from './Components/MyLists/MyLists'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/*Todo las rutas que haya que meter, se meten aqui como una Route*/}
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/MyLists' component={MyLists} />
        <PrivateRoute path='/' component={Finder} />
        <Route path="*" component={() => {return <div>404 Not found</div>}} />
      </Switch>
      <MultimediaContent data={data} type={'song'}/>
    </Router>
  )
}

export default App
