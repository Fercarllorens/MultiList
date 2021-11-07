import React, { useEffect } from 'react'
import ArtistLogic from './ArtistLogic'
import './Artist.css'
import FindSongs from '../Finder/FindSongs/FindSongs'

interface Props{
    json: object;
}

const Artist: React.FC<Props> = (props) => {
    const {fetch_artist, name, picture, genres, songs} = ArtistLogic()

    useEffect(() => {
        fetch_artist()
    }, [])

    return (
        <div className="artist-container">
            <h1 className="name">
                {name}
            </h1>
            <div className="pic-info-div">
                <div className="picture-div">
                    <img className="picture" src={picture}></img>
                </div>
                <div className="info-div">
                    <h2>Genres</h2>
                    {
                    genres != null && genres.map((element, index) => {
                        return(
                            
                            <li key={index}>{element}</li>
                            
                        )
                    })                   
                    }
                </div>
            </div>
            <div className="discography">
               <h2>Discography</h2>
               <FindSongs songs={songs}/>
            </div>
        </div>
    )
}
export default Artist