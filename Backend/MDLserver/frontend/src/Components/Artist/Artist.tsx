import React, { useEffect } from 'react'
import ArtistLogic from './ArtistLogic'
import './Artist.css'

interface Props{
    json: object;
}

const Artist: React.FC<Props> = (props) => {
    const {fetch_artist, name} = ArtistLogic()

    useEffect(() => {
        fetch_artist()
    }, [])

    return (
        <div className="ArtistContainer">
            <div className="Name">
                {name}
            </div>
        </div>
    )
}
export default Artist