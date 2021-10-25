import { useState } from "react";
import { useEffect } from "react";

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
}

interface Film{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    genre: any;
}

interface Series{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    genre: any;
}

const FinderLogic = () => {

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
        let url = 'http://127.0.0.1:8000/spotify/search?query=' + content + '&type=track&user=llivpulki6ty8ysxpng6uw22xinec7d5';
        fetch(url)
            .then((res) => res.json())
            .then((json) => set_tracks_list(json))
            .catch((err) => console.error(err))
    }

    // Fetch of the films query
    const fetchFilms = async () => {
        const res = await fetch('')
        const data = await res.json()

        console.log(data)
        return data
    }

    // Fetch of the series query
    const fetchSeries = async () => {
        const res = await fetch('')
        const data = await res.json()

        console.log(data)
        return data
    }

    // Catches the enter event of the search bar
    const find = (e: any, content: string) => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            type_selected.songs_selected && find_songs(content)
            type_selected.films_selected && find_films()
            type_selected.series_selected && find_series()
            e.preventDefault();
            return false;
        }
    }

    // Search for songs
    const find_songs = (content: string) => {
        fetchSongs(content)
    }

    // Search for films
    const find_films = () => {
        build_films()
    }

    // Search for series
    const find_series = () => {
        build_series()
    }

    const build_series = () => {
        let show_list: Array<any> = shows
        let res: Array<any> = []
        if(typeof show_list === "object" && show_list !== null && show_list !== undefined){
            show_list.forEach((element) => {
                const { name, authors, date, img, preview_url, genre} = element
                res.push({
                    name: name,
                    authors: authors,
                    date: date,
                    img: img,
                    preview_url: preview_url,
                    genre: genre
                })
            })
        }
        set_series(res)
    }

    const build_films = () => {
        let movie_list: Array<any> = movies
        let res: Array<any> = []
        if(typeof movie_list === "object" && movie_list !== null && movie_list !== undefined){
            movie_list.forEach((element) => {
                const { name, authors, date, img, preview_url, genre} = element
                res.push({
                    name: name,
                    authors: authors,
                    date: date,
                    img: img,
                    preview_url: preview_url,
                    genre: genre
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

                const { album, artists, name, preview_url } = element
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
                    album: album
                })
                
            })

            set_songs(res)
        }
    }
    
    useEffect(() => {
        tracks_list != undefined && build_songs()
    },
    [tracks_list])
    

    return {songs, films, series, find, select_films, select_series, select_songs, type_selected}
}
export default FinderLogic