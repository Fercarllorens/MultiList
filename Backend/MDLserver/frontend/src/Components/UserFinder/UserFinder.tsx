import React, {useEffect} from 'react'
import { Link, RouteComponentProps } from "react-router-dom";
import UserFinderLogic from './UserFinderLogic'
import './UserFinder.css'

const UserFinder = () =>{
    const {content, on_change, find} = UserFinderLogic()
    return(
        <div className="user-container">
            <div className="top-user-container">
                <input className="SearchBar" type="search" placeholder="Search..." onKeyPress={(e) => find(e, content)} onChange={(e) => on_change(e)}/>
            </div>
        </div>
    )
}