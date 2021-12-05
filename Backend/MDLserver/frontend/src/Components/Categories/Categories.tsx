import React, { useEffect } from 'react'
import './Categories.css'
import CategoriesLogic from './CategoriesLogic'
import SearchBar from "../Finder/SearchBar/SearchBar"
import Filters from "../Finder/Filters/Filters"
import FindCategories from './FindCategories/FindCategories'

interface Props{
}

const Categories: React.FC<Props> = (props) => {
    const {getFilmCategories, filmsCategories, getSeriesCategories, seriesCategories, getSongsCategories, songsCategories, find, selectType, type_selected,
        filteredFilmsCategories, filteredSeriesCategories, filteredSongsCategories} = CategoriesLogic(props)

    useEffect(() => {
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
            {type_selected.films_selected && <FindCategories categories={filteredFilmsCategories}/>}
            {type_selected.series_selected && <FindCategories categories={filteredSeriesCategories}/>}
            {type_selected.songs_selected && <FindCategories categories={filteredSongsCategories}/>}
        </div>
    )
}

export default Categories