import { useState } from "react";
import { useEffect } from "react";
import { resourceLimits } from "worker_threads";

interface Type{
    films_selected: boolean;
    series_selected: boolean;
    songs_selected: boolean;
}

export interface Song{
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
    preview_url: string;
}

interface Series{
    name: string;
    img: string;
    id: string;
    preview_url: string;
}

const FinderLogic = () => {

    const [type_selected, setTypeSelected] = useState<Type>({
        
        films_selected: false,
        series_selected: false,
        songs_selected: false
    
    })
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

    // Fetch of the songs query
    const fetchSongs = async (content: string) => {
        let userId : string | null = localStorage.getItem('user_id')
        let url = 'http://127.0.0.1:8000/spotify/search?query=' + content + '&type=track&user=' + userId;
        fetch(url)
            .then((res) => res.json())
            .then((json) => setTracksList(json))
            .catch((err) => console.error(err))
    }

    // Fetch of the films query
    const fetchFilms = async (content: string) => {
        let url = 'http://127.0.0.1:8000/video/search?term=' + content + '&country=uk';

        fetch(url)
            .then((res) => res.json())
            .then((json) => setMoviesList(json))
            .catch((err) => console.error(err))
    }

    // Fetch of the series query
    const fetchSeries = async (content: string) => {
        let url = 'http://127.0.0.1:8000/video/search?term=' + content + '&country=uk';

        fetch(url)
            .then((res) => res.json())
            .then((json) => setShowsList(json))
            .catch((err) => console.error(err))
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
        if (type == "films") fetchFilms(content)
        else if (type == "series") fetchSeries(content)
        else fetchSongs(content)
    }

    const buildSeries = () => {
        setSeries(undefined);
        const { results } = shows_list != null ? shows_list : ''
        let series_list: Array<any> = results != null ? results : []
        let res: Array<any> = []

        if(typeof series_list === "object" && series_list !== null && series_list !== undefined && series_list.length !== undefined){
            series_list.forEach((element) => {
                const { name, picture, external_ids, locations } = element
                const { imdb } = external_ids
                let preview_url = ""

                locations.forEach((link: { icon: string; url: string; }) => {
                    link.url == "Netflix" ? preview_url = link.url : preview_url = ""
                })

                res.push({
                    id: imdb.id,
                    name: name,
                    img: picture,
                    preview_url: preview_url,
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

        if(typeof films_list === "object" && films_list !== null && films_list !== undefined && films_list.length !== undefined){
            films_list.forEach((element) => {
                const { name, picture, external_ids, locations } = element
                const { imdb } = external_ids
                let preview_url = ""

                locations.forEach((link: { icon: string; url: string; }) => {
                    link.url == "Netflix" ? preview_url = link.url : preview_url = ""
                })

                res.push({
                    id: imdb.id,
                    name: name,
                    img: picture,
                    preview_url: preview_url,
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

        if(typeof track_list === "object" && track_list !== null && track_list !== undefined && track_list.length !== undefined){
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
    
    useEffect(() => {
        //TODO mejorar estos ifs feos :(
        if (type_selected.songs_selected) tracks_list != undefined && buildSongs()
        else if (type_selected.films_selected) movies_list != undefined && buildFilms()
        else {
            shows_list != undefined && buildSeries()
        }
    },
    [tracks_list, shows_list, movies_list])
    
    return {songs, films, series, find, selectType, type_selected}
}
export default FinderLogic