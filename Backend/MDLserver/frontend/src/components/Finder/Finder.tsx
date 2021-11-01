import FinderLogic from './FinderLogic';
import SearchBar from "./SearchBar/SearchBar"
import Filters from "./Filters/Filters"
import './Finder.css'
import FindSongs from './FindSongs/FindSongs';
import FindFilms from './FindFilms/FindFilms';
import FindSeries from './FindSeries/FindSeries';
import { useEffect } from 'react';

const Finder: React.FC = () => {
    const {find, songs, films, series, selectType, type_selected, tracks_list, movies_list, shows_list, buildSongs, buildFilms, buildSeries} = FinderLogic()

    useEffect(() => {
        //TODO mejorar estos ifs feos :(
        if (type_selected.songs_selected) tracks_list != undefined && buildSongs()
        else if (type_selected.films_selected) movies_list != undefined && buildFilms()
        else {
            shows_list != undefined && buildSeries()
        }
    },
    [tracks_list, shows_list, movies_list])

    return (
        <div className="FinderContainer">
            <div className="searchbar-container">
                <SearchBar find={find} />
            </div>
            <Filters selectType={selectType} type_selected={type_selected}/>
            {type_selected.songs_selected && <FindSongs songs={songs}/>}
            {type_selected.films_selected && <FindFilms films={films}/>}
            {type_selected.series_selected && <FindSeries series={series}/>}
        </div>
    )
}

export default Finder