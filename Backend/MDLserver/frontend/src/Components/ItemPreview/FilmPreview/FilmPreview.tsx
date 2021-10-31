import React from 'react'
import FilmPreviewLogic from './FilmPreviewLogic'
import './FilmPreview.css'

interface Film{
    id: string
    name: string;
    img: string;
}

interface Props{
    film: Film
}

const FilmPreview: React.FC<Props> = ({film}) => {
    const {show_film} = FilmPreviewLogic()

    return (
        <div className="FilmPreviewContainer" onClick={() => {show_film(film.id)}}>
            <div className="PictureDiv">
                <img className="Picture" src={film.img} height="130" width="130" alt="no disponible"></img>
            </div>
            <div className="FilmInfo">
                <div className="FilmName">
                    {film.name}
                </div>
            </div>
        </div>
    )
}
export default FilmPreview