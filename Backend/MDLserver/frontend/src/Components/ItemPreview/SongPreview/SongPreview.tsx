import React from 'react'
import SongPreviewLogic from './SongPreviewLogic'
import './SongPreview.css'

interface Song{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    album: any;
    id: string;
    genres: string
}

interface Props{
    song: Song
}

const SongPreview: React.FC<Props> = ({song}) => {
    const {show_song} = SongPreviewLogic()

    return (
        <div className="preview-container" onClick={() => {show_song(song.id)}}>
            <div className="image-container">
                <img className="song-image" src={song.img} height="130" width="130"></img>
            </div>
            <div className="SongInfo">
                <div className="song-name">
                    {song.name}
                </div>
                <div className="song-authors">
                    {song.authors}
                </div>
                {/* <div className="SongDate">
                    {song.date}
                </div> */}
            </div>
        </div>
    )
}
export default SongPreview