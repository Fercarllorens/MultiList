import React from 'react'
import FindFilmsLogic from './FindFilmsLogic'
import FilmPreview from '../FilmPreview/FilmPreview'
import './FindFilms.css'

interface Film{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    genre: any;
}

interface Props{
    films: Film[] | undefined
}

const FindFilms: React.FC<Props> = ({films}) => {
    const {} = FindFilmsLogic()

    return (
        <div className="FindFilmsContainer">
            <>
            {
                films!==undefined ?
                    films.map((element) => (
                        <FilmPreview film={element} />
                    ))
                : 'No results'
            }
            </>
        </div>
    )
}
export default FindFilms