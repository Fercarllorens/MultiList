import FinderLogic from './FinderLogic';
import SearchBar from "../SearchBar/SearchBar"
import Filters from "../Filters/Filters"
import './Finder.css'
import FindSongs from '../FindSongs/FindSongs';

const Finder: React.FC = () => {
    const {find, songs, select_films, select_series, select_songs, type_selected} = FinderLogic()

    return (
        <div className="FinderContainer">
            <SearchBar find={find} />
            <Filters set_films={select_films} set_series={select_series} set_songs={select_songs} type_selected={type_selected}/>
            {type_selected.songs_selected && <FindSongs songs={songs}/>}
        </div>
    )
}

export default Finder