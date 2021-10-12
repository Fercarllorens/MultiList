import { useState } from "react";

interface Type{
    films_selected: boolean;
    series_selected: boolean;
    songs_selected: boolean;
}

interface Song{
    name: string;
    authors: string;
    date: string;
    img: string;
}

const FinderLogic = () => {

    const [type_selected, set_type_selected] = useState<Type>({
        
        films_selected: false,
        series_selected: false,
        songs_selected: false
    
    })

    const [tracks, set_tracks] = useState([])

    const [songs, set_songs] = useState<Song[]>()

    const select_films = () =>{
        set_type_selected({films_selected: true, series_selected: false, songs_selected: false})
    }

    const select_series = () => {
        set_type_selected({films_selected: false, series_selected: true, songs_selected: false})
    }

    const select_songs = () => {
        set_type_selected({films_selected: false, series_selected: false, songs_selected: true})
    }

    
    const fetchSongs = async () => {
        const res = await fetch('')
        const data = await res.json()

        console.log(data)
        return data
    }

    const find = (e: any) => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            console.log("Buscar");
            e.preventDefault();
            return false;
        }
    }

    const getTasks = async () => {
        const tracksFromServer = await fetchSongs()
        set_tracks(tracksFromServer)
    }



    const build_songs = (track_list: Array<any>) => {
        let res: Song[] = []

        if(typeof tracks === "object" && tracks !== null && tracks !== undefined){
            track_list.forEach((element) => {

                const { album, artists, name } = element
                const { release_date, images } = album
                var authors_string: string = ""

                artists.forEach((artist: { name: string; }) => {
                    authors_string += artist.name + " "
                })
                
                let img = images.find((element: { height: number; }) => element.height === 300)
                
                res.push({
                    name: name,
                    authors: authors_string,
                    date: release_date,
                    img: img.url,
                })
                
            })

            set_songs(res)
        }

        
    }



    return {find, select_films, select_series, select_songs, type_selected}
}
export default FinderLogic