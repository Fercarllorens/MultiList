import FiltersLogic from './FiltersLogic';
import './Filters.css'

const Filters: React.FC = () => {
    const {set_films, set_series, set_songs, type_selected} = FiltersLogic()

    return (
        <div className="filter-container">
            <button id="films" className={type_selected.films_selected ? 'type selected' : 'type'} onClick={() => {set_films()}}>Films</button>
            <button id="series" className={type_selected.series_selected ? 'type selected' : 'type'} onClick={() => {set_series()}}>Series</button>
            <button id="songs" className={type_selected.songs_selected ? 'type selected' : 'type'} onClick={() => {set_songs()}}>Songs</button>
        </div>
    )
}

export default Filters


