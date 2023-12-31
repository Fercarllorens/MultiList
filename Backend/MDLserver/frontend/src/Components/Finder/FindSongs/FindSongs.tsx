import React from 'react'
import FindSongsLogic from './FindSongsLogic'
import SongPreview from '../../ItemPreview/SongPreview/SongPreview'
import './FindSongs.css'

interface Song{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    album: any;
    id: string;
    genres: string;
}

interface Props{
    songs: Song[] | undefined
}

const FindSongs: React.FC<Props> = ({songs}) => {
    const {} = FindSongsLogic()

    return (
        <div className="FindSongsContainer">
            <>
            {
                songs!==undefined ?
                    songs.map((element) => (
                        <SongPreview song={element} key={element.name}/>
                    ))
                : <p className ="nrf">No results found ...</p>
            }
            </>
        </div>
    )
}
export default FindSongs