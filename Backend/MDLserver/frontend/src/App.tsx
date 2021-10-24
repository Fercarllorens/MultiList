import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Profile from './Components/Profile/Profile'
//import logo from './logo.svg'
import './App.css'
import Finder from './Components/Finder/Finder'
import MultimediaContent from './Components/MultimediaContent/MultimediaContent'

import './App.css'

function App() {
  let data = require('C:\\Users\\Asefron\\source\\repos\\FranchoPlz\\PINX_XM-01\\Backend\\MDLserver\\frontend\\src\\Components\\track.json');
  return (
    <Router>
      <Navbar />
      <Switch>
        {/*Todo las rutas que haya que meter, se meten aqui como una Route*/}
        <Route path='/Profile' component={Profile} />
      </Switch>
      <MultimediaContent data={data} type={'song'}/>
    </Router>
  )
}

export default App
