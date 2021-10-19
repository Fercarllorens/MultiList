import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar'
import Finder from './Components/Finder/Finder'

import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/*Todo las rutas que haya que meter, se meten aqui como una Route*/}
      </Switch>
    </Router>
  )
}

export default App
