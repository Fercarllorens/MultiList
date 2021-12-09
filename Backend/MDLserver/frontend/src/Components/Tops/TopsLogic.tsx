import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { fetchHandlerCb } from '../fetchHandler'

export interface VisualContent{
    id: number;
    img: string;
    name: string;
}

export interface AudioContent{
    id: string;
    img: string;
    name: string;
    authors: string;
}

const ComponentNameLogic = () => {
    const [movies, setMovies] = useState<undefined | VisualContent[]>()
    const [tv, setTv] = useState<undefined | VisualContent[]>()
    const [songs, setSongs] = useState<undefined | AudioContent[]>()

    let history = useHistory()  

    const fetchMovies = () => {
        fetchHandlerCb(`video/get-tops?media_type=movie`, 'GET', null, processMovies)
    }

    const fetchTv = () => {
        fetchHandlerCb(`video/get-tops?media_type=tv`, 'GET', null, processTv)
    }

    const fetchSongs = () => {
        let userId : string | null = localStorage.getItem('user_id')
        fetchHandlerCb(`spotify/get-playlist?id=5FN6Ego7eLX6zHuCMovIR2&user=${userId}`, 'GET', null, processSongs)
    }

    const processMovies = (json: any) => {
        const { results } = json != null ?  json : ''
        let movie_list: Array<any> = results != null ? results : []
        let res: Array<VisualContent> = []

        if(typeof movie_list === "object" && movie_list !== null && movie_list !== undefined){
            movie_list.forEach((element) => {
                const { id, poster_path, title } = element
                res.push({
                    id: id,
                    img: 'https://image.tmdb.org/t/p/w500' + poster_path,
                    name: title
                })
            })

            setMovies(res)
        }
    }

    const processTv = (json: any) => {
        const { results } = json != null ?  json : ''
        let movie_list: Array<any> = results != null ? results : []
        let res: Array<VisualContent> = []

        if(typeof movie_list === "object" && movie_list !== null && movie_list !== undefined){
            movie_list.forEach((element) => {
                const { id, poster_path, name } = element
                res.push({
                    id: id,
                    img: 'https://image.tmdb.org/t/p/w500' + poster_path,
                    name: name
                })
            })

            setTv(res)
        }
    }

    const processSongs = (json: any) => {
        const { tracks } = json != null ?  json : ''
        let track_list: Array<any> = tracks.items != null ? tracks.items : []
        let res: Array<AudioContent> = []

        if(typeof track_list === "object" && track_list !== null && track_list !== undefined){
            track_list.forEach((item) => {

                const { track } = item
                const { album, artists, name, preview_url, id } = track
                const { images } = album
                let authors_string: string = ""

                artists.forEach((artist: { name: string; genres: string[]; }, index: number) => {
                    index == 0 ? authors_string = artist.name
                    : authors_string += ", " + artist.name
                    const {genres} = artist;
                })
                
                let img = images.find((element: { height: number; }) => element.height === 300)
                
                res.push({
                    id: id,
                    img: img.url,
                    name: name,
                    authors: authors_string,
                })
                
            })

            setSongs(res)
        }
    }

    const showSheet = (id: string, type: "film" | "series" | "song") => {
        
        history.push({
            pathname:'/MultimediaContent',
            search: `?type=${type}&id=${id}`
         })
    }


    return { movies, tv, songs, fetchMovies, fetchTv, fetchSongs, showSheet }
}
export default ComponentNameLogic