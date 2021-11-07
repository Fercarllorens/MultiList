import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchHandler, fetchHandlerCb } from '../fetchHandler'
import {Song} from '../Finder/FinderLogic'

const ArtistLogic = () => {
    const [name, setName] = useState<null | string>(null)
    const [picture, setPicture] = useState<string>('https://us.123rf.com/450wm/seetwo/seetwo1907/seetwo190700208/126635447-ning%C3%BAn-signo-vac%C3%ADo-c%C3%ADrculo-tachado-rojo-signo-no-permitido-aislar-sobre-fondo-blanco-ilustraci%C3%B3n-vec.jpg?ver=6')
    const [genres, setGenres] = useState<null | string[]>(null)
    const [songs, setSongs] = useState<Song[] | undefined>()

    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const id_query: any = query.get('id')
    const user_id : string | null = localStorage.getItem('user_id')

    const fetch_artist = () => {
        fetchHandlerCb(`spotify/get-artist?id=${id_query}&user=${user_id}`, 'GET', null, processArtist)
    }

    function processArtist(json: any){
        const artist: any = json;
        const {name,images,genres} = artist != null ? artist : '';

        fetchHandlerCb(`spotify/search?query=${name}&type=track&user=${user_id}`, 'GET', null, processArtistSongs)
        let image_url: string

        if(images[0].url != null){
            image_url = images[0].url
            setPicture(image_url)
        }
        
        setName(name)
        setGenres(genres)
    }

    function processArtistSongs(json: any){
        setSongs(undefined)
        const { tracks } = json != null ?  json : ''
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

    return {fetch_artist, name, picture, genres, songs}
}
export default ArtistLogic