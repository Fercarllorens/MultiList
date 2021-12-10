import React from 'react'
import FilmPreviewLogic from './FilmPreviewLogic'
import '../ContentPreview.css'

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
        <div className="content" onClick={() => {show_film(film.id)}}>
            <img className="Picture" src={film.img} height="130" width="130"></img>
            <div className="Info">
                {/* <div className="Name">
                    {film.name}
                </div> */}
            </div>
        </div>
    )
}
export default FilmPreview