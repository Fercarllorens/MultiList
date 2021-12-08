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
        <div className="FinderContainer">
            <div className="searchbar-container">
                <SearchBar find={find} />
            </div>
            <Filters selectType={selectType} type_selected={type_selected}/>         
            {type_selected.films_selected &&
                    filteredFilmsCategories?.map((element) => (
                        <div>
                            <div className="CategoryName">
                                {element.name}
                            </div>
                            {userCategories?.includes(element.id) ? 
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Green_tick.svg/1200px-Green_tick.svg.png" width="100" height="100"/> :
                                <input type="image" onClick={()=>{addCategory(element)}} src="https://static.thenounproject.com/png/2453491-200.png" width="100" height="100"/>
                            }
                        </div>
                        )
                    )
            }
            {type_selected.series_selected && 
                filteredSeriesCategories?.map((element) => (
                        <div>
                            <div className="CategoryName">
                                {element.name}
                            </div>
                            {userCategories?.includes(element.id) ? 
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Green_tick.svg/1200px-Green_tick.svg.png" width="100" height="100"/> :
                                <input type="image" onClick={()=>{addCategory(element)}} src="https://static.thenounproject.com/png/2453491-200.png" width="100" height="100"/>
                            }
                        </div>
                        )
                    )
            }
            {type_selected.songs_selected && 
                filteredSongsCategories?.map((element) => (
                        <div>
                            <div className="CategoryName">
                                {element.name}
                            </div>
                            {userCategories?.includes(element.id) ? 
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Green_tick.svg/1200px-Green_tick.svg.png" width="100" height="100"/> :
                                <input type="image" onClick={()=>{addCategory(element)}} src="https://static.thenounproject.com/png/2453491-200.png" width="100" height="100"/>
                            }
                        </div>
                        )
                    )
            }
        </div>
    )
}

export default Categories