import { type } from 'os';
import { stringify } from 'querystring';
import React, { useState } from 'react'

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
    const [json, set_json] = useState();
    let image_url = 'not available';
    let trailer_url = 'not available';
    let list_top = [];
    let list_bot = [];

    const fetch_post_film = async (id: string) => {
        //let url = 'http://127.0.0.1:8000/api';
        let url = ''
        const body = JSON.stringify({id: id});
        fetch(url, {method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }
    
    const fetch_get_film = async (id: string) => {
        //let url = 'http://127.0.0.1:8000/spotify/get-track?id=${id}&user=jxl18bdljif6xgk8hgrcfdk3mgsxy0eo'
        let url = ''
        fetch(url)
            .then((res) => res.json())
            .then((json) => set_json(json))
            .catch((err) => console.error(err))
    }

    const fetch_post_series = async (id: string) => {
        //let url = 'http://127.0.0.1:8000/api';
        let url = ''
        const body = JSON.stringify({id: id});
        fetch(url, {method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
    }
    
    const fetch_get_series = async (id: string) => {
        //let url = 'http://127.0.0.1:8000/spotify/get-track?id=${id}&user=jxl18bdljif6xgk8hgrcfdk3mgsxy0eo'
        let url = ''
        fetch(url)
            .then((res) => res.json())
            .then((json) => set_json(json))
            .catch((err) => console.error(err))
    }

    if(props.type == 'song'){
        let track: any = props.data;
        const {name, album, artists, duration_ms, preview_url} = track;
        const {release_date, images} = album;        
        let artists_string = 'No artists found';
        let genres_string = 'Not genres found';

        artists.forEach((artist: { name: string; genres: string[]; }, index: number) => {
            index == 0 ? artists_string = artist.name : artists_string += (", " + artist.name)
            const {genres} = artist;

            genres.forEach((element: any, index: number) => index == 0 ? genres_string = element : genres_string += (', ' + element));
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

    else if(props.type == 'series'){
        //fetch_post_series(props.id)
        let show: any = props.data;
        const { id, name, picture } = show

        image_url = picture;
        list_top.push(name);
    }

    else if(props.type == 'film'){
        //fetch_post_film(props.id)
        let movie: any = props.data;
        const { id, name, picture } = movie

        image_url = picture;
        list_top.push(name);
    }

    let userId : string | null = localStorage.getItem('user_id') 
    let contentId : string | null = props.contentId;
    const [ progress, setProgress] = useState<null | Progress>(null)


    let url : string = `http://localhost:8000/api/get-progress?user_id=${userId}&content_id=${contentId}`
    fetch(url)
      .then((res) => res.json())
      .then((json) => setProgress(json))
      .catch((err) => console.error(err))

    const [ imageUrl, setImageUrl] = useState<null | string>(image_url)
    const [ trailerUrl , setTrailerUrl] = useState<null | string>(trailer_url)
    const [ listTop , setListTop] = useState<null | string[]>(list_top)
    const [ listBottom , setListBottom] = useState<null | string[]>(list_bot)
    
    
    return {listTop, imageUrl, trailerUrl, listBottom, progress}
}

const GetAlbumName = (album:any) => {
    const {name} = album;

    return name;
}

const submitProgress = (progress:string, state:string, contentId:string) => {
    let userId : string | null = localStorage.getItem('user_id') 
    let url : string = `http://localhost:8000/api/get-progress?user_id=${userId}&content_id=${contentId}&state=${state}&progress=${progress}`
    const [data , setData] = useState<null | JSON>(null)
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
}

export default MultimediaContentLogic