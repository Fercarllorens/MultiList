import React, {useEffect} from 'react'
import { Link, RouteComponentProps } from "react-router-dom";
import MyFollowsLogic from './MyFollowsLogic'
import './MyFollows.css'

const MyFollows = () =>{
    const {getData, follows, unfollow_user} = MyFollowsLogic()
    useEffect(() => {
        getData()
     }, [])

    return(
        <div className="user-container">
            <h2 className="title-myFollows">FOLLOWING</h2>
            <h2 className="title-recommended">RECOMMENDED FOLLOWS</h2>
            <div className="myfollows-cont">
                {
                    follows.map((element : any) => {
                        return(
                            <div className="user userMyFollows">
                                <img className="img-user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXKo36JFQDLpzs9giWMBSBEKgmjDNsXd7cA&usqp=CAU" />
                                <h4 className="user-name">{element.name}</h4>
                                <button className="unfollow-btn" onClick={() => unfollow_user(element.id)}>
                                    <img className="unfollow-button" src="unfollow.png"></img>
                                </button>
                            </div>
                        )
                        
                    })
                }
            </div>
            <div className="recommended-cont">
                
            </div>
        </div>

    )
}

export default MyFollows