import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchHandler, fetchHandlerCb } from '../fetchHandler'

const ArtistLogic = () => {
    const [name, setName] = useState<null | string>(null)
    
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const id_query: any = query.get('id')
    const user_id : string | null = localStorage.getItem('user_id')

    const fetch_artist = () => {
        fetchHandlerCb(`spotify/get-artist?id=${id_query}&user=${user_id}`, 'GET', null, processArtist)
    }

    function processArtist(json: any){
        const artist: any = json;
        const {name} = artist != null ? artist : '';
        
        setName(name)
    }

    return {fetch_artist, name}
}
export default ArtistLogic