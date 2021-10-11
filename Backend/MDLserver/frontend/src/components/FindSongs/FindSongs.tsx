import React from 'react'
import FindSongsLogic from './FindSongsLogic'
import SongPreview from '../SongPreview/SongPreview'
import './FindSongs.css'

interface Props{
    
}

const FindSongs: React.FC<Props> = (props) => {
    const {} = FindSongsLogic()

    return (
        <div className="FindSongsContainer">
            <SongPreview />
            <SongPreview />
            <SongPreview />
            <SongPreview />
            <SongPreview />
            <SongPreview />
            <SongPreview />
            <SongPreview />
            <SongPreview />
        </div>
    )
}
export default FindSongs