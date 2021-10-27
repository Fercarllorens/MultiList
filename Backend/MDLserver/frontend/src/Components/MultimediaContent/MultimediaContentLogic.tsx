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
    let userId : string | null = localStorage.getItem('user_id') 

    const fetchPostSong = async (id: string | null, name: string | null) => {
        let url = 'http://127.0.0.1:8000/api/post-song/';
        const body = JSON.stringify({id: id, name: name});
        fetch(url, {method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }

    const fetchGetTrack = async (id: string | null, user_id: string | null) => {
        let url= 'http://127.0.0.1:8000/spotify/get-track?id=' + id + '&user=' + user_id;
        fetch(url)
            .then((res) => res.json())
            .then((json) => set_result_json(json))
            .catch((err) => console.error(err))
        //set_result_json(require('../../FakeJSONs/DespacitoTrackJson.json'))
    }

    const fetchPostFilm = async (id: string | null) => {
        //let url = 'http://127.0.0.1:8000/api';
        let url = ''
        const body = JSON.stringify({id: id});
        fetch(url, {method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }
    
    const fetchGetFilm = async (id: string | null) => {
        //let url = 'http://127.0.0.1:8000/spotify/get-track?id=${id}&user=jxl18bdljif6xgk8hgrcfdk3mgsxy0eo'
        let url = ''
        fetch(url)
            .then((res) => res.json())
            .then((json) => set_result_json(json))
            .catch((err) => console.error(err))
    }

    const fetchPostSeries = async (id: string | null) => {
        //let url = 'http://127.0.0.1:8000/api/post-tipo';
        let url = ''
        const body = JSON.stringify({id: id});
        fetch(url, {method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }
    
    const fetchGetSeries = async (id: string | null) => {
        //let url = 'http://127.0.0.1:8000/spotify/get-track?id=${id}&user=jxl18bdljif6xgk8hgrcfdk3mgsxy0eo'
        let url = ''
        fetch(url)
            .then((res) => res.json())
            .then((json) => set_result_json(json))
            .catch((err) => console.error(err))
    }

    const fetchGetProgress = async () => {
        let url : string = `http://localhost:8000/api/get-progress?user_id=${userId}&content_id=${contentId}`
        fetch(url)
            .then((res) => res.json())
            .then((json) => setProgress(json))
            .catch((err) => console.error(err))
    }

    if(type_query == 'song'){
        fetchGetTrack(id_query, userId)
        const { track } = result_json != null ?  result_json : ''
        let track_aux: Array<any | null> = track != null ? track : []
        const {name, album, artists, duration_ms, preview_url} = track_aux != null ? track_aux : '';
        fetchPostSong(id_query, name); 
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
    let userId : string | null = localStorage.getItem('user_id') 
    let url : string = `http://localhost:8000/api/get-progress?user_id=${userId}&content_id=${contentId}&state=${state}&progress=${progress}`
    const [data , setData] = useState<null | JSON>(null)
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
}

export default MultimediaContentLogic