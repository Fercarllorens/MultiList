import FiltersLogic from './FiltersLogic'
import './Filters.css'

interface Props{
    selectType: (type: "films" | "series" | "songs") => void;
    type_selected: {
        films_selected: boolean;
        series_selected: boolean;
        songs_selected: boolean;
    }
}

const Filters: React.FC<Props> = ({selectType, type_selected}) => {
    const {} = FiltersLogic()

    return (
        <div className="FilterContainer">
            <button id="films" className={type_selected.films_selected ? 'Type FilmsSelected' : 'Type'} onClick={() => {selectType("films")}}>Films</button>
            <button id="series" className={type_selected.series_selected ? 'Type SeriesSelected' : 'Type'} onClick={() => {selectType("series")}}>Series</button>
            <button id="songs" className={type_selected.songs_selected ? 'Type SongsSelected' : 'Type'} onClick={() => {selectType("songs")}}>Songs</button>
        </div>
    )
}

export default Filters