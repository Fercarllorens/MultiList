import FinderLogic from './FinderLogic';
import SearchBar from "../SearchBar/SearchBar"
import Filters from "../Filters/Filters"
import './Finder.css'
import FindSongs from '../FindSongs/FindSongs';
import FindFilms from '../FindFilms/FindFilms';

const Finder: React.FC = () => {
    const {find, songs, films, select_films, select_series, select_songs, type_selected} = FinderLogic()

    return (
        <div className="FinderContainer">
            <SearchBar find={find} />
            <Filters set_films={select_films} set_series={select_series} set_songs={select_songs} type_selected={type_selected}/>
<<<<<<< HEAD:Backend/MDLserver/frontend/src/Components/Finder/Finder.tsx
            {type_selected.songs_selected && <FindSongs songs={songs}/>}
=======
            <FindSongs songs={songs}/>
            <FindFilms films={films}/>
>>>>>>> 29e9372 (Creados componentes para películas y modificado el finder):Backend/MDLserver/frontend/src/components/Finder/Finder.tsx
        </div>
    )
}

export default Finder