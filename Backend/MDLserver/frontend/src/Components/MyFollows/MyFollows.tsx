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
            {/* <h2 className="title-recommended">RECOMMENDED FOLLOWS</h2> */}
            <div className="myfollows-cont">
                {
                    follows.map((element : any) => {
                        return(
                            <div className="user userMyFollows">
                                <img className="img-user" src="https://us.123rf.com/450wm/thesomeday123/thesomeday1231709/thesomeday123170900021/85622928-icono-de-perfil-de-avatar-predeterminado-marcador-de-posici%C3%B3n-de-foto-gris-vectores-de-ilustraciones.jpg?ver=6" />
                                <h4 className="user-name">{element.name}</h4>
                                <button className="unfollow-btn" onClick={() => unfollow_user(element.id)}>
                                    <img className="unfollow-button" src="unfollow.png"></img>
                                </button>
                            </div>
                        )
                        
                    })
                }
            </div>
            {/* <div className="recommended-cont">
                
            </div> */}
        </div>

    )
}

export default MyFollows