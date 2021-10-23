import React from 'react'
import FilmPreviewLogic from './FilmPreviewLogic'
import './SongPreview.css'

interface Film{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    genre: any;
}

interface Props{
    film: Film
}

const FilmPreview: React.FC<Props> = ({film}) => {
    const {show_film} = FilmPreviewLogic()

    return (
        <div className="FilmPreviewContainer" onClick={() => {show_film()}}>
            <div className="PictureDiv">
                <img className="Picture" src={film.img} height="130" width="130"></img>
            </div>
            <div className="FilmInfo">
                <div className="FilmName">
                    {film.name}
                </div>
                <div className="FilmAuthor">
                    {film.authors}
                </div>
                <div className="FilmDate">
                    {film.date}
                </div>
                <div className="FilmGenre">
                    Genre
                </div>
            </div>
        </div>
    )
}
export default FilmPreview