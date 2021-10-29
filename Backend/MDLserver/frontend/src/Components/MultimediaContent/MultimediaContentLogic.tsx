import { type } from 'os';
import { stringify } from 'querystring';
import {useForm} from 'react-hook-form';
import React, { useState } from 'react'
import { useLocation } from 'react-router';

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
    const [ listTop , setListTop] =         useState<null | string[]>(null)
    const [ listBottom , setListBottom] =   useState<null | string[]>(null)
    const [ progress, setProgress] =        useState<null | Progress>(null)
    const [ added, setAdded ] =             useState<boolean>(isContentAdded())
    const [ watching, setWatching ] =       useState<string>("TEXTO POR DEFECTO") //PONER AQUI EL TEXTO QUE QUIERES QUE SALGA POR DEFECTO
    const { register, handleSubmit } = useForm();
    
    const contentId : string | null = props.contentId;
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

    async function fetchRequest(id: string, item_type: string, method: "get" | "post" | "put", 
        endpoint: string , args: any | null){
        const url = base_url + endpoint + '/';
        const req_type: any = {
            get_song: "get-track",
            post_song: "post-song",
            get_series: "get-by-id",
            get_film: "get-by-id",
            post_series: "post-series",
            post_film: "post-film",
        }

        let endpoint_index: string= method + '_' + item_type;
        let fetch_url = url + req_type[endpoint_index];

        if (method=="get"){
            //TODO: could make this iterable, no time to waste now
            let req_query = `?${args.id}=${id}&${args.param1_name}=${args.param1}`;
            fetch(fetch_url+req_query)
                .then((res) => res.json())
                .then((json) => {
                    switch(item_type){
                        case "song":
                            processSong(json); break;
                        case "series":
                            processSeries(json); break;
                        case "film":
                            processFilm(json); break;
                    }
                })
                .catch((err) => console.error(err))
        }else{
            let body = JSON.stringify({id: id, name: args.element_name});
            fetch(fetch_url, {method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
                .then((res) => console.log(res))
                .catch((err) => console.error(err))
        }
    }


    function getData(){
        switch(type_query){
            case "song":
                fetchRequest(id_query, 'song', 'get', 'spotify', {
                        user_id: user_id, 
                        id: 'id', 
                        param1_name: 'user', 
                        param1: user_id
                    }); break;
            case "series":
                //fetchRequest(); break;
            case "film":
                //fetchRequest(); break;
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
        
        // Post our item to our api
        fetchRequest(id_query, 'song', 'post', 'api', {name: name});
            
        let artists_string = 'No artists found';
        let genres_string = 'Not genres found';

        artists.forEach((artist: { name: string; genres: string[]; }, index: number) => {
            index == 0 ? artists_string = artist.name : artists_string += (", " + artist.name)
            const {genres} = artist;

            if(genres != undefined){
                genres.forEach((element: any, index: number) => index == 0 ? genres_string = element : genres_string += (', ' + element));
            }            
        });

        let year = release_date.substring(0,4);    
        let img = images.find((element: { height: number; }) => element.height === 300)
        let duration = (duration_ms / 60000).toString();
        let formated_duration = duration.split('.')[0] + '.' + duration.split('.')[1].substring(0,2);
        let album_name = GetAlbumName(album);
        
        setImageUrl(img.url);
        setTrailerUrl(preview_url);
        setListTop([name, props.type, year, genres_string, 'green']);
        setListBottom([formated_duration, '', '', artists_string, release_date, album_name]);
    }

    function processFilm(json: any){
        // //fetchPostFilm(id_query)
        // //let show: any = fetchGetFilm(id_query);
        // let show = require('../../FakeJSONs/FilmViewJson.json')
        // const { collection } = show
        // const { id, name, picture } = collection
        // image_url = picture;
        // //console.log('imagen: ' + image_url)
        // list_top.push(name);
    }

    function processSeries(json: any){
        // //fetchPostSeries(id_query)
        // //let show: any = fetchGetSeries(id_query);
        // let show = require('../../FakeJSONs/SeriesViewJson.json')
        // const { collection } = show
        // const { id, name, picture } = collection
        // image_url = picture;
        // //console.log('imagen: ' + image_url)
        // list_top.push(name);
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
        const body = JSON.stringify({
            value_in_api: data.watching_state
            value_in_api: data.watching_progress
        })

        fetch(....)
    }

    return {listTop, imageUrl, trailerUrl, listBottom, progress, watching, setWatching,
        type_query, id_query, getData, handleAddContent, handleUpdateProgress, register, handleSubmit}
}

export default MultimediaContentLogic