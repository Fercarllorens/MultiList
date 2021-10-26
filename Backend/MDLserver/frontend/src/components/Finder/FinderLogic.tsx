import { useState } from "react";
import { useEffect } from "react";
import { resourceLimits } from "worker_threads";

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

    
    //console.log(userId)
    //console.log('hola')

    const [type_selected, set_type_selected] = useState<Type>({
        
        films_selected: false,
        series_selected: false,
        songs_selected: false
    
    })

    const [shows, set_shows] = useState([
        {
            "name": "Persona 4 The Animation",
            "authors": "Seiji Kishi",
            "date": "March 30, 2012s",
            "img": "https://upload.wikimedia.org/wikipedia/en/5/55/P4A_promo.jpg",
            "preview_url": "https://www.youtube.com/watch?v=SwwJ00PqqFI",
            "genre": "Action / Fantasy",
        }
    ])

    const [movies, set_movies] = useState([
        {
            "name": "Persona 3 The Movie #1: Spring of Birth",
            "authors": "Noriaki Akitaya",
            "date": "November 23th, 2013",
            "img": "https://static.wikia.nocookie.net/megamitensei/images/e/e0/P3TM1-ost.jpg/revision/latest?cb=20160824205251",
            "preview_url": "https://www.youtube.com/watch?v=r7-M90PNk5E",
            "genre": "Action / Fantasy",
        }
    ])

    const [tracks_list, set_tracks_list] = useState<any | undefined>()

    const [shows_list, set_shows_list] = useState<any | undefined>()

    const [movies_list, set_movies_list] = useState<any | undefined>()

    const [songs, set_songs] = useState<Song[] | undefined>()

    const [films, set_films] = useState<Film[] | undefined>()

    const [series, set_series] = useState<Series[] | undefined>()

    // Updates the type_selected state setting all false except films_selected
    const select_films = () =>{
        set_type_selected({films_selected: true, series_selected: false, songs_selected: false})
    }

    // Updates the type_selected state setting all false except series_selected
    const select_series = () => {
        set_type_selected({films_selected: false, series_selected: true, songs_selected: false})
    }

    // Updates the type_selected state setting all false except songs_selected
    const select_songs = () => {
        set_type_selected({films_selected: false, series_selected: false, songs_selected: true})
    }

    // Fetch of the songs query
    const fetchSongs = async (content: string) => {
        let userId : string | null = localStorage.getItem('user_id')
        console.log(userId)
        let url = 'http://127.0.0.1:8000/spotify/search?query=' + content + '&type=track&user=' + userId;
        fetch(url)
            .then((res) => res.json())
            .then((json) => set_tracks_list(json))
            .catch((err) => console.error(err))
    }

    // Fetch of the films query
    const fetchFilms = async (content: string) => {
        //TODO meter url
        let url = ''

        fetch(url)
            .then((res) => res.json)
            .then((json) => set_movies_list(json))
            .catch((err) => console.error(err))
    }

    // Fetch of the series query
    const fetchSeries = async (content: string) => {
        //TODO meter url
        let url = ''

        fetch(url)
            .then((res) => res.json)
            .then((json) => set_shows_list(json))
            .catch((err) => console.error(err))
    }

    // Catches the enter event of the search bar
    const find = (e: any, content: string) => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            type_selected.songs_selected && find_songs(content)
            type_selected.films_selected && find_films(content)
            type_selected.series_selected && find_series(content)
            e.preventDefault();
            return false;
        }
    }

    // Search for songs
    const find_songs = (content: string) => {
        fetchSongs(content)
    }

    // Search for films
    const find_films = (content: string) => {
        fetchFilms(content)
    }

    // Search for series
    const find_series = (content: string) => {
        fetchSeries(content)
    }

    const build_series = () => {
        const { results } = shows_list
        let show_list: Array<any> = results.items
        let res: Array<any> = []

        if(typeof show_list === "object" && show_list !== null && show_list !== undefined){
            //TODO comprobar que este bien
            show_list.forEach((element) => {
                const { id, name, picture } = element

                res.push({
                    id: id,
                    name: name,
                    img: picture
                })
            })
        }
        set_series(res)
    }

    const build_films = () => {
        const { results } = shows_list
        let movie_list: Array<any> = results.items
        let res: Array<any> = []

        if(typeof movie_list === "object" && movie_list !== null && movie_list !== undefined){
            //TODO comprobar que este bien
            movie_list.forEach((element) => {
                const { id, name, picture } = element

                res.push({
                    id: id,
                    name: name,
                    img: picture
                })
            })
        }
        set_films(res)
    }

    // Transforms the array of tracks into a array of songs saved on songs
    const build_songs = () => {
        const { tracks } = tracks_list
        let track_list: Array<any> = tracks.items
        let res: Array<any> = []

        if(typeof track_list === "object" && track_list !== null && track_list !== undefined){
            track_list.forEach((element) => {

                const { album, artists, name, preview_url, id } = element
                const { release_date, images } = album
                var authors_string: string = ""

                artists.forEach((artist: { name: string; }, index: number) => {
                    index == 0 ? authors_string = artist.name
                    : authors_string += ", " + artist.name
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
                })
                
            })

            set_songs(res)
        }
    }
    
    useEffect(() => {
        tracks_list != undefined && build_songs()
    },
    [tracks_list])

    useEffect(() => {
        shows_list != undefined && build_series()
    },
    [shows_list])

    useEffect(() => {
        movies_list != undefined && build_films()
    },
    [movies_list])
    

    return {songs, films, series, find, select_films, select_series, select_songs, type_selected}
}
export default FinderLogic