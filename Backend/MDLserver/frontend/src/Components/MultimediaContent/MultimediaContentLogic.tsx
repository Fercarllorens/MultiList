import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { useLocation } from 'react-router';
import { fetchHandler, fetchHandlerCb } from '../fetchHandler'

interface Props {
    data : JSON | null;
    type : string | null;
    contentId: string
}

interface Progress {
    user_id: string
    content_id: string
    state: string
    progress: string
}

// trailer es string, pasamos la url para usarla como source
const MultimediaContentLogic = (props:Props) => {
    const [ imageUrl, setImageUrl] =        useState<null | string>(null)
    const [ trailerUrl , setTrailerUrl] =   useState<null | string>(null)
    const [ listTop , setListTop] =         useState<string[]>([])
    const [ listBottom , setListBottom] =   useState<string[]>([])
    const [ progress, setProgress] =        useState<null | Progress>(null)
    const [ added, setAdded ] =             useState<boolean>(isContentAdded())
    const [ watching, setWatching ] =       useState<string>("TEXTO POR DEFECTO") //PONER AQUI EL TEXTO QUE QUIERES QUE SALGA POR DEFECTO
    const [ rating, setRating] =            useState<null | number>(null) 
    const [ comments, setComments] =        useState<null | number[]>(null)
    const { register, handleSubmit } = useForm();
    
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const type_query: any = query.get('type')
    const id_query: any = query.get('id')
    const user_id : string | null = localStorage.getItem('user_id') 
    const base_url = 'http://127.0.0.1:8000/'

    function isContentAdded() :boolean{
        //TODO: This function has to fetch the actual state of the content, check if it is added
        return false
    }

    function getData(){
        switch(type_query){
            case "song":
                fetchHandlerCb(`spotify/get-track?id=${id_query}&user=${user_id}`, 'GET', null, processSong); break;
            case "series":
                fetchHandlerCb(`video/get-by-id?id=${id_query}&user=${user_id}`, 'GET', null, processSeries); break;
            case "film":
                fetchHandlerCb(`video/get-by-id?id=${id_query}&user=${user_id}`, 'GET', null, processFilm); break;
        }        
    }
    
    const GetAlbumName = (album:any) => {
        const {name} = album;

        return name;
    }

    function processSong(json: any){
        const track: any = json;
        const {name, album, artists, duration_ms, preview_url} = track != null ? track : '';
        const {release_date, images} = album != null ? album : ''; 
        
        // New way to use fetchHandler
        //TODO: save output -> itll be the obj retrieved, need to get the comments if exists and the rating.
        const obj = fetchHandler('api/post-content', 'POST', {'name': name, 'type': 'song', 'external_id': id_query});
            
        let artists_string = 'No artists found';
        let genres_string = 'Not genres found';

        artists.forEach((artist: { name: string; genres: string[]; }, index: number) => {
            index == 0 ? artists_string = artist.name : artists_string += (", " + artist.name)
            const {genres} = artist;

            if(genres != undefined){
                genres.forEach((element: any, index: number) => index == 0 ? genres_string = element : genres_string += (', ' + element));
            }            
        });

        const year = release_date.substring(0,4);    
        const img = images.find((element: { height: number; }) => element.height === 300)
        const duration = (duration_ms / 60000).toString();
        const formated_duration = duration.split('.')[0] + '.' + duration.split('.')[1].substring(0,2);
        const album_name = album.name;
        
        setImageUrl(img.url);
        setTrailerUrl(preview_url);
        setListTop([name, props.type, year, genres_string, 'green']);
        setListBottom([formated_duration, '', '', artists_string, release_date, album_name]);
    }

    function processFilm(json: any){
        const film: any = json;
        const {collection} = film != null ? film : '';
        const {name, picture} = collection != null ? collection : '';

        //fetchRequest(id_query, 'film', 'post', 'api', {element_name: name});
        // New way to use fetchHandler
        fetchHandler('/api/post-content', 'POST', {'name': name, 'type': 'film'});

        setImageUrl(picture.url);
        setListTop([name, props.type, 'red']);
    }

    function processSeries(json: any){
        const film: any = json;
        const {collection} = film != null ? film : '';
        const {name, picture} = collection != null ? collection : '';

        //fetchRequest(id_query, 'series', 'post', 'api', {element_name: name});
        // New way to use fetchHandler
        fetchHandler('/api/post-content', 'POST', {'name': name, 'type': 'series'});

        setImageUrl(picture.url);
        setListTop([name, props.type, 'blue']);
    }
      
    function handleAddContent(){
        //user id, content id y content_type
        const body = JSON.stringify({
            user_id: user_id,
            content_id: id_query,
            content_type: type_query
        })

        //TODO if request goes ok, update icon of the button
        fetch(base_url+'/api/update-list', {method:"POST", body: body, headers:{'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error(err))
    }

    function handleUpdateProgress(data: any){
        // const body = JSON.stringify({
        //     value_in_api: data.watching_state
        //     value_in_api: data.watching_progress
        // })

        // fetch(....)
    }

    return {listTop, imageUrl, trailerUrl, listBottom, progress, watching, setWatching, rating, comments,
        type_query, id_query, getData, handleAddContent, handleUpdateProgress, register, handleSubmit}
}

export default MultimediaContentLogic