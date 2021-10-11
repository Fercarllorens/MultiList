import FinderLogic from './FinderLogic';
import Search_bar from "../Search_bar/Search_bar"
import Filters from "../Filters/Filters"
import './Finder.css'
import FindSongs from '../FindSongs/FindSongs';

const Finder: React.FC = () => {
    const {set_films, set_series, set_songs, type_selected} = FinderLogic()

    return (
        <div className="FinderContainer">
            <Search_bar />
            <Filters set_films={set_films} set_series={set_series} set_songs={set_songs} type_selected={type_selected}/>
            <FindSongs />
        </div>
    )
}

export default Finder