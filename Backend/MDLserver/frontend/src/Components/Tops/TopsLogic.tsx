import React, { useState } from 'react'
import { fetchHandlerCb } from '../fetchHandler'

export interface VisualContent{
    id: number;
    img: string;
    name: string;
}

const ComponentNameLogic = () => {
    const [movies, setMovies] = useState<undefined | VisualContent[]>()
    const [tv, setTv] = useState<undefined | VisualContent[]>()

    const fetchMovies = () => {
        fetchHandlerCb(`video/get-tops?media_type=movie`, 'GET', null, processMovies)
    }

    const fetchTv = () => {
        fetchHandlerCb(`video/get-tops?media_type=tv`, 'GET', null, processTv)
    }

    const processMovies = (json: any) => {
        setMovies(undefined);
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
        setMovies(undefined);
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


    return { movies, tv, fetchMovies, fetchTv }
}
export default ComponentNameLogic