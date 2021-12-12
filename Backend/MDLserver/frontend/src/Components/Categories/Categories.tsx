import React, { useEffect } from 'react'
import './Categories.css'
import CategoriesLogic from './CategoriesLogic'
import SearchBar from "../Finder/SearchBar/SearchBar"
import Filters from "../Finder/Filters/Filters"

interface Props{
}

const Categories: React.FC<Props> = (props) => {
    const {getFilmCategories, filmsCategories, getSeriesCategories, seriesCategories, getSongsCategories, songsCategories, find, selectType, type_selected,
        filteredFilmsCategories, filteredSeriesCategories, filteredSongsCategories, getUserAndUserCategories, userCategories, addCategory} = CategoriesLogic(props)

    useEffect(() => {
        getUserAndUserCategories()
        getFilmCategories()
        getSeriesCategories()
        getSongsCategories()
    }, [])


    return(
        <div className="categories-container">
            <div className="SearchbarContainer">
                <SearchBar find={find} />
            </div>
            <Filters selectType={selectType} type_selected={type_selected}/>     
            <div className='categories_type_container'>  
                { type_selected.songs_selected ?
                    filteredSongsCategories?.map((element, index) => (
                        <div className='category-preview' key={index}>
                            <h3 className="CategoryName">
                                {element.name}
                            </h3>
                            {userCategories?.includes(element.id) ? 
                                <img src="added-button.png" width="30" height="30"/> :
                                <img src="add-button.png" onClick={()=>{addCategory(element)}}  width="35" height="30"/>
                            }
                        </div>
                        )
                    )
                    : type_selected.series_selected ? 
                    filteredSeriesCategories?.map((element, index) => (
                        <div className='category-preview' key={index}>
                            <h3 className="CategoryName">
                                {element.name}
                            </h3>
                            {userCategories?.includes(element.id) ? 
                                <img src="added-button.png" width="30" height="30"/> :
                                <img src="add-button.png" onClick={()=>{addCategory(element)}}  width="35" height="30"/>
                            }
                        </div>
                        )
                    ) : filteredFilmsCategories?.map((element, index) => (
                        <div className='category-preview' key={index}>
                            <h3 className="CategoryName">
                                {element.name}
                            </h3>
                            {userCategories?.includes(element.id) ? 
                                <img src="added-button.png" width="30" height="30"/> :
                                <img src="add-button.png" onClick={()=>{addCategory(element)}}  width="35" height="30"/>
                            }
                        </div>
                        )
                    )
                }
            </div> 
        </div>
    )
}

export default Categories