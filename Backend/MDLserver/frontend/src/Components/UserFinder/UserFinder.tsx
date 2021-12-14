import React, { useEffect } from 'react'
import { Link, RouteComponentProps } from "react-router-dom";
import UserFinderLogic from './UserFinderLogic'
import './UserFinder.css'

const UserFinder = () => {
    const { content, on_change, find, userList, show_user } = UserFinderLogic()
    return (
        <div className="user-container">
            <div className="top-user-container">
                <h3 className="search-title">Find Users</h3>
                <input className="SearchBar SearchBarUser" type="search" placeholder="Search..." onKeyPress={(e) => find(e, content)} onChange={(e) => on_change(e)} />
            </div>
            <div className="bottom-user-container">
                {
                    userList.map((element) => {

                        return (
                            <div className="user" onClick={() => show_user(element.user_id)}>
                                <img className="img-user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXKo36JFQDLpzs9giWMBSBEKgmjDNsXd7cA&usqp=CAU" />
                                <h4 className="user-name">{element.username}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default UserFinder