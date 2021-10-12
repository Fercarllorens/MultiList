import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import React from 'react'
import './App.css'
// Screens
import MultimediaContent from './Components/MultimediaContent/MultimediaContent'

let datos: JSON = JSON.parse('{}')
const App = () => {
   return (
    <MultimediaContent data = {datos} />)
      
      
      
      {/*
          
        <Router>
       
       <Switch>
         {/*<Route exact Path='/Multimedia' component={}></Route>}

       </Switch>
     </Router>*/}
   

 }

 export default App
