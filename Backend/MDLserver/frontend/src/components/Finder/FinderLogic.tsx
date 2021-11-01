import { useState } from "react";
import { resourceLimits } from "worker_threads";
import { fetchHandler } from '../fetchHandler';

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
    preview_url: string;
    album: any;
    id: string;
    genres: string;
}

interface Film{
    name: string;
    img: string;
    id: string;
}

interface Series{
    name: string;
    img: string;
    id: string;
}

const FinderLogic = () => {

    const [type_selected, setTypeSelected] = useState<Type>({
        
        films_selected: false,
        series_selected: false,
        songs_selected: false
    
    })
    const [shows, setShows] = useState([
        {
            "name": "Persona 4 The Animation",
            "authors": "Seiji Kishi",
            "date": "March 30, 2012s",
            "img": "https://upload.wikimedia.org/wikipedia/en/5/55/P4A_promo.jpg",
            "preview_url": "https://www.youtube.com/watch?v=SwwJ00PqqFI",
            "genre": "Action / Fantasy",
        }
    ])
    const [movies, setMovies] = useState([
        {
            "name": "Persona 3 The Movie #1: Spring of Birth",
            "authors": "Noriaki Akitaya",
            "date": "November 23th, 2013",
            "img": "https://static.wikia.nocookie.net/megamitensei/images/e/e0/P3TM1-ost.jpg/revision/latest?cb=20160824205251",
            "preview_url": "https://www.youtube.com/watch?v=r7-M90PNk5E",
            "genre": "Action / Fantasy",
        }
    ])
    const [tracks_list, setTracksList] = useState<any | undefined>()
    const [shows_list, setShowsList] = useState<any | undefined>()
    const [movies_list, setMoviesList] = useState<any | undefined>()
    const [songs, setSongs] = useState<Song[] | undefined>()
    const [films, setFilms] = useState<Film[] | undefined>()
    const [series, setSeries] = useState<Series[] | undefined>()

    // Updates the type_selected state setting all false except the type passed to the function
    const selectType = (type: "films" | "series" | "songs") => {
        if (type == "films") setTypeSelected({films_selected: true, series_selected: false, songs_selected: false})
        else if (type == "series") setTypeSelected({films_selected: false, series_selected: true, songs_selected: false})
        else setTypeSelected({films_selected: false, series_selected: false, songs_selected: true})
    }

    const fetchContent = async (type: "songs" | "films" | "series", content: string) => {
        let url: string

        if (type == "songs") {
            let userId : string | null = localStorage.getItem('user_id')
            url = 'spotify/search?query=' + content + '&type=track&user=' + userId;
            let json = fetchHandler(url, 'GET', {})
            setTracksList(json)
        }
        else if (type == "films"){
            url = '/video/search?term=' + content + '&country=uk';
            let json = fetchHandler(url, 'GET', {})
            setMoviesList(json)
        }
        else {
            url = 'http://127.0.0.1:8000/video/search?term=' + content + '&country=uk';
            let json = fetchHandler(url, 'GET', {})
            setShowsList(json)
        }
    }

    // Catches the enter event of the search bar
    const find = (e: any, content: string) => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            type_selected.songs_selected && findType("songs", content)
            type_selected.films_selected && findType("films", content)
            type_selected.series_selected && findType("series", content)
            e.preventDefault();
            return false;
        }
    }

    // Search the content of the parameter as the type indicated as "type" parameter
    const findType = (type: "films" | "series" | "songs", content: string) => {
        if (type == "films") fetchContent("films", content)
        else if (type == "series") fetchContent("series", content)
        else fetchContent("songs", content)
    }

    const buildSeries = () => {
        setSeries(undefined);
        const { results } = shows_list != null ? shows_list : ''
        let series_list: Array<any> = results != null ? results : []
        let res: Array<any> = []

        if(typeof series_list === "object" && series_list !== null && series_list !== undefined){
            //TODO comprobar que este bien
            series_list.forEach((element) => {
                const { id, name, picture } = element

                res.push({
                    id: id,
                    name: name,
                    img: picture
                })
            })
        }
        setSeries(res)
    }

    const buildFilms = () => {
        setFilms(undefined);
        const { results } = movies_list != null ? movies_list : ''
        let films_list: Array<any> = results != null ? results : []
        let res: Array<any> = []

        if(typeof films_list === "object" && films_list !== null && films_list !== undefined){
            //TODO comprobar que este bien
            films_list.forEach((element) => {
                const { id, name, picture } = element

                res.push({
                    id: id,
                    name: name,
                    img: picture
                })
            })
        }
        setFilms(res)
    }

    // Transforms the array of tracks into a array of songs saved on songs
    const buildSongs = () => {
        setSongs(undefined)
        const { tracks } = tracks_list != null ?  tracks_list : ''
        let track_list: Array<any> = tracks.items != null ? tracks.items : []
        let res: Array<any> = []

        if(typeof track_list === "object" && track_list !== null && track_list !== undefined){
            track_list.forEach((element) => {

                const { album, artists, name, preview_url, id } = element
                const { release_date, images } = album
                let authors_string: string = ""
                let genres_string: string = 'Not genres found'

                artists.forEach((artist: { name: string; genres: string[]; }, index: number) => {
                    index == 0 ? authors_string = artist.name
                    : authors_string += ", " + artist.name
                    const {genres} = artist;

                    if(genres != undefined){
                        genres.forEach((element: any, index: number) => index == 0 ? genres_string = element : genres_string += (', ' + element));
                    } 
                })
                
                let img = images.find((element: { height: number; }) => element.height === 300)
                
                res.push({
                    name: name,
                    authors: authors_string,
                    date: release_date,
                    img: img.url,
                    preview_url: preview_url,
                    album: album,
                    id: id,
                    genres: genres_string
                })
                
            })

            setSongs(res)
        }
    }
    
    return {songs, films, series, find, selectType, type_selected, tracks_list, movies_list, shows_list, buildSongs, buildFilms, buildSeries}
}
export default FinderLogic