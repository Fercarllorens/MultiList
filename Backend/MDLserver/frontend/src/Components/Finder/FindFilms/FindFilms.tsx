import React from 'react'
import FindFilmsLogic from './FindFilmsLogic'
import FilmPreview from '../../ItemPreview/FilmPreview/FilmPreview'
import './FindFilms.css'

interface Film{
    id: string
    name: string;
    img: string;
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
                        <FilmPreview film={element} key={element.name}/>
                    ))
                : <p className ="nrf">No results found ...</p>
            }
            </>
        </div>
    )
}
export default FindFilms