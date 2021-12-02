import React, { useEffect } from 'react'
import './Categories.css'
import CategoriesLogic from './CategoriesLogic'

interface Props{
}

const Categories: React.FC<Props> = (props) => {
    const {getFilmCategories, filmsCategories, getSeriesCategories, seriesCategories, getSongsCategories, songsCategories} = CategoriesLogic(props)

    useEffect(() => {
        getFilmCategories()
        getSeriesCategories()
        getSongsCategories()
    }, [])


    return(
        <div className="categories-container">
            <ul className="genres">
                {
                    filmsCategories != null && filmsCategories.map((element, index) => {
                        return(                           
                            <li key={index}>{element.name}</li>                           
                        )
                    })                   
                }
            </ul>
        </div>
    )
}

export default Categories