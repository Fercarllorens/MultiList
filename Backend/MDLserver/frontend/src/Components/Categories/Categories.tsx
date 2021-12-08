import React, { useEffect } from 'react'
import './Categories.css'
import CategoriesLogic from './CategoriesLogic'
import SearchBar from "../Finder/SearchBar/SearchBar"
import Filters from "../Finder/Filters/Filters"
import CategoryPreview from './CategoryPreview/CategoryPreview'

interface Props{
}

const Categories: React.FC<Props> = (props) => {
    const {getFilmCategories, filmsCategories, getSeriesCategories, seriesCategories, getSongsCategories, songsCategories, find, selectType, type_selected,
        filteredFilmsCategories, filteredSeriesCategories, filteredSongsCategories, getUserAndUserCategories, userCategories} = CategoriesLogic(props)

    useEffect(() => {
        getUserAndUserCategories()
        getFilmCategories()
        getSeriesCategories()
        getSongsCategories()
    }, [])


    return(
        <div className="FinderContainer">
            <div className="searchbar-container">
                <SearchBar find={find} />
            </div>
            <Filters selectType={selectType} type_selected={type_selected}/>         
            {type_selected.films_selected &&
                    filteredFilmsCategories?.map((element) => (
                        <CategoryPreview category={element}/>
                        )
                    )
            }
            {type_selected.series_selected && 
                filteredSeriesCategories?.map((element) => (
                        <CategoryPreview category={element}/>
                        )
                    )
            }
            {type_selected.songs_selected && 
                filteredSongsCategories?.map((element) => (
                        <CategoryPreview category={element}/>
                        )
                    )
            }
        </div>
    )
}

export default Categories