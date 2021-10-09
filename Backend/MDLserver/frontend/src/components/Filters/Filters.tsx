import { useState } from "react";
import './Filters.css'
import { select_films, select_series, select_songs } from './Filter_logic'

interface Type{
    films_selected: boolean;
    series_selected: boolean;
    songs_selected: boolean;
}

const Filters: React.FC = () => {
    const [type_selected, set_type_selected] = useState<Type>({
        films_selected: false,
        series_selected: false,
        songs_selected: false
    })

    function set_films(){
        set_type_selected({films_selected: true, series_selected: false, songs_selected: false})
    }

    function set_series(){
        set_type_selected({films_selected: false, series_selected: true, songs_selected: false})
    }

    function set_songs(){
        set_type_selected({films_selected: false, series_selected: false, songs_selected: true})
    }

    return (
        <div className="filter-container">
            <button id="films" className={type_selected.films_selected ? 'type selected' : 'type'} onClick={() => {set_films()}}>Films</button>
            <button id="series" className={type_selected.series_selected ? 'type selected' : 'type'} onClick={() => {set_series()}}>Series</button>
            <button id="songs" className={type_selected.songs_selected ? 'type selected' : 'type'} onClick={() => {set_songs()}}>Songs</button>
        </div>
    )
}

export default Filters


