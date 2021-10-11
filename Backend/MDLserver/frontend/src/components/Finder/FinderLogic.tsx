import { useState } from "react";

interface Type{
    films_selected: boolean;
    series_selected: boolean;
    songs_selected: boolean;
}

const FinderLogic = () => {

    const [type_selected, set_type_selected] = useState<Type>({
        
        films_selected: false,
        series_selected: false,
        songs_selected: false
    
        })


        const set_films = () =>{
            set_type_selected({films_selected: true, series_selected: false, songs_selected: false})
        }

        const set_series = () => {
            set_type_selected({films_selected: false, series_selected: true, songs_selected: false})
        }

        const set_songs = () => {
            set_type_selected({films_selected: false, series_selected: false, songs_selected: true})
        }

        return {set_films, set_series, set_songs, type_selected}
}
export default FinderLogic