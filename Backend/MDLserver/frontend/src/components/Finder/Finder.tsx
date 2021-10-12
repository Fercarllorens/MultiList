import FinderLogic from './FinderLogic';
import Search_bar from "../Search_bar/Search_bar"
import Filters from "../Filters/Filters"
import './Finder.css'
import FindSongs from '../FindSongs/FindSongs';

const Finder: React.FC = () => {
    const {find, select_films, select_series, select_songs, type_selected} = FinderLogic()

    return (
        <div className="FinderContainer">
            <Search_bar find={find} />
            <Filters set_films={select_films} set_series={select_series} set_songs={select_songs} type_selected={type_selected}/>
            <FindSongs />
        </div>
    )
}

export default Finder