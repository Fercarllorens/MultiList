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
            <div className="genres">
                <h4 className="bottom-title">Film Categories</h4>
                {
                    filmsCategories != null && filmsCategories.map((element, index) => {
                        return(                           
                            <><p> {element.name} </p><input type="image" src="http://www.clker.com/cliparts/L/q/T/i/P/S/add-button-white-md.png" /></>
                        )
                    })                   
                }
            </div>
            <div className="genres">
                <h4 className="bottom-title">Film Categories</h4>
                {
                    seriesCategories != null && seriesCategories.map((element, index) => {
                        return(                           
                            <><p> {element.name} </p><input type="image" src="http://www.clker.com/cliparts/L/q/T/i/P/S/add-button-white-md.png" /></>                         
                        )
                    })                   
                }
            </div>
        </div>
        
    )
}

export default Categories