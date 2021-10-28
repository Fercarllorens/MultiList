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

    const [result_json, set_result_json] = useState<any | undefined>()
    let image_url = 'not available';
    let trailer_url = 'not available';
    let list_top = [];
    let list_bot = [];
    //let fakeJson = require('../../FakeJSONs/DespacitoTrackJson.json')
    let {search} = useLocation()
    let query = new URLSearchParams(search)
    let type_query = query.get('type')
    let id_query = query.get('id')
    let user_id : string | null = localStorage.getItem('user_id') 

    const fetchRequest = async(id: string | null, type_string: string | null, method: string | null, 
        endpoint: string | null, specific_parameters: any = {}) => {
        const base_url = 'http://127.0.0.1:8000/' + endpoint + '/';

        const req_type: any = {
            get_song: "get-track",
            post_song: "post-song",
            get_series: "get-by-id",
            get_film: "get-by-id",
            post_series: "post-series",
            post_film: "post-film",
        }

        let endpoint_index: string= method + '_' + type_string;
        let fetch_url = base_url + req_type[endpoint_index];
        let request_body;

        switch (method){
            case "get":
                request_body = '?' + specific_parameters.id_parameter_name + '=' + id + '&' 
                + specific_parameters.second_get_parameter_name + '=' 
                + specific_parameters.second_get_parameter;
                fetch_url += request_body
                fetch(fetch_url)
                    .then((res) => res.json())
                    .then((json) => set_result_json(json))
                    .then((json) => console.log(json))
                    .catch((err) => console.error(err))
                break
            case "post":
                request_body = JSON.stringify({id: id, name: specific_parameters.element_name});
                fetch(fetch_url, {method: 'POST', body: request_body, headers: {'Content-Type': 'application/json'}})
                    .then((res) => console.log(res))
                    .catch((err) => console.error(err))
                break
            default:
                break
        }
    }

    if(type_query == 'song'){
        fetchRequest(id_query, 'song', 'get', 'spotify', {user_id: user_id, id_parameter_name: 'id', second_get_parameter_name: 'user', second_get_parameter: user_id});
        const track: any = result_json != null ?  result_json : '';
        const {name, album, artists, duration_ms, preview_url} = track != null ? track : '';
        fetchRequest(id_query, 'song', 'post', 'api', {name: name});
        const {release_date, images} = album != null ? album : '';               
            
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
        image_url = img.url;
        let duration = (duration_ms / 60000).toString();
        let formated_duration = duration.split('.')[0] + '.' + duration.split('.')[1].substring(0,2);

        let album_name = GetAlbumName(album);
        trailer_url = preview_url;

        list_top.push(name, props.type, year, genres_string, 'green');
        list_bot.push(formated_duration, '', '', artists_string, release_date, album_name);
    }

    else if(type_query == 'series'){
        //fetchPostSeries(id_query)
        //let show: any = fetchGetSeries(id_query);
        let show = require('../../FakeJSONs/SeriesViewJson.json')
        const { collection } = show
        const { id, name, picture } = collection
        image_url = picture;
        //console.log('imagen: ' + image_url)
        list_top.push(name);
    }

    else if(type_query == 'film'){
        //fetchPostFilm(id_query)
        //let show: any = fetchGetFilm(id_query);
        let show = require('../../FakeJSONs/FilmViewJson.json')
        const { collection } = show
        const { id, name, picture } = collection
        image_url = picture;
        //console.log('imagen: ' + image_url)
        list_top.push(name);
    }

    let contentId : string | null = props.contentId;
    const [ progress, setProgress] = useState<null | Progress>(null)

    //fetchGetProgress()
    const [ imageUrl, setImageUrl] = useState<null | string>(image_url)
    const [ trailerUrl , setTrailerUrl] = useState<null | string>(trailer_url)
    const [ listTop , setListTop] = useState<null | string[]>(list_top)
    const [ listBottom , setListBottom] = useState<null | string[]>(list_bot)
      
    return {listTop, imageUrl, trailerUrl, listBottom, progress, type_query, id_query}
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