import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import Navbar from './Components/Navbar/Navbar'
//import Profile from './Components/Profile/Profile'
//import logo from './logo.svg'
import './App.css'
import Finder from './Components/Finder/Finder'

import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/*Todo las rutas que haya que meter, se meten aqui como una Route*/}
        <Route path='/Profile' component={Profile} />
      </Switch>
    </Router>
  )
}

export default App
