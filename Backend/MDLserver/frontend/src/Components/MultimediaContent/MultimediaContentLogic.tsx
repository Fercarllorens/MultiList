import { type } from 'os';
import { stringify } from 'querystring';
import React, { useState } from 'react'

interface Props {
    data : JSON | null;
    type : string | null;
}

// trailer es string, pasamos la url para usarla como source
const MultimediaContentLogic = (props:Props) => {
    let image_url = 'not available';
    let trailer_url = 'not available';
    let list_top = [];
    let list_bot = [];

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
        trailer_url = preview_url;

        list_top.push(name, props.type, year, genres_string, 'green');
        list_bot.push(formated_duration, '', '', artists_string, release_date);
    }

    else if(props.type == 'series'){

    }

    else if(props.type == 'film'){
        
    }

    const [ imageUrl, setImageUrl] = useState<null | string>(image_url)
    const [ trailerUrl , setTrailerUrl] = useState<null | string>(trailer_url)
    const [ listTop , setListTop] = useState<null | string[]>(list_top)
    const [ listBottom , setListBottom] = useState<null | string[]>(list_bot)
    
    
    return {listTop, imageUrl, trailerUrl, listBottom}
}

export default MultimediaContentLogic