import React from 'react'
import SongPreviewLogic from './SongPreviewLogic'
import '../ContentPreview.css'

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
        <div className="SongPreviewContainer" onClick={() => {show_song(song.id)}}>
            <div className="PictureDiv">
                <img className="Picture" src={song.img} height="130" width="130"></img>
            </div>
            <div className="SongInfo">
                <div className="SongName">
                    {song.name}
                </div>
                <div className="SongAuthor">
                    {song.authors}
                </div>
                <div className="SongDate">
                    {song.date}
                </div>
                <div className="SongGenre">
                    {song.genres}
                </div>
            </div>
        </div>
    )
}
export default SongPreview