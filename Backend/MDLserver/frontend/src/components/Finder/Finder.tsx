import FinderLogic from './FinderLogic';
import SearchBar from "./SearchBar/SearchBar"
import Filters from "./Filters/Filters"
import './Finder.css'
import FindSongs from './FindSongs/FindSongs';
import FindFilms from './FindFilms/FindFilms';
import FindSeries from './FindSeries/FindSeries';

const Finder: React.FC = () => {
    const {find, songs, films, series, selectType, type_selected} = FinderLogic()

    return (
        <div className="FinderContainer">
            <div className="searchbar-container">
                <SearchBar find={find} />
            </div>
            <Filters selectType={selectType} type_selected={type_selected}/>
            <div className="find-component-container">
                {type_selected.songs_selected && <FindSongs songs={songs}/>}
                {type_selected.films_selected && <FindFilms films={films}/>}
                {type_selected.series_selected && <FindSeries series={series}/>}
            </div>
        </div>
    )
}

export default Finder