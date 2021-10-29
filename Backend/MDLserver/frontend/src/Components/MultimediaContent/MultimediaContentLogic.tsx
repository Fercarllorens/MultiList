import { type } from 'os';
import { stringify } from 'querystring';
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
    const [ listTop , setListTop] =         useState<string[]>([])
    const [ listBottom , setListBottom] =   useState<string[]>([])
    const [ progress, setProgress] =        useState<null | Progress>(null)
    
    
    const contentId : string | null = props.contentId;
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const type_query: any = query.get('type')
    const id_query: any = query.get('id')
    const user_id : string | null = localStorage.getItem('user_id') 
    const base_url = 'http://127.0.0.1:8000/'

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
                    console.log(json)
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
      
    return {listTop, imageUrl, trailerUrl, listBottom, progress, type_query, id_query, getData}
}

const GetAlbumName = (album:any) => {
    const {name} = album;

    return name;
}

const SubmitProgress = (progress:string, state:string, contentId:string) => {
    let user_id : string | null = localStorage.getItem('user_id') 
    let url : string = `http://localhost:8000/api/get-progress?user_id=${user_id}&content_id=${contentId}&state=${state}&progress=${progress}`
    const [data , setData] = useState<null | JSON>(null)
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
}

export default MultimediaContentLogic