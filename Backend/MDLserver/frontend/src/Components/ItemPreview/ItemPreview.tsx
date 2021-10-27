import React from 'react'
import FilmPreview from './FilmPreview/FilmPreview'
import SeriesPreview from './SeriesPreview/SeriesPreview'
import SongPreview from './SongPreview/SongPreview'

interface Props{
    ItemType: string;
    data: any;
}

const ItemPreview: React.FC<Props> = (props) => {
    switch(props.ItemType){
        case 'film':
            return <FilmPreview film={props.data}/>;
        case 'series':
            return <SeriesPreview series={props.data}/>;
        case 'song':
            return <SongPreview song={props.data}/>;
        default:
            return <div>SOMETHING WENT WRONG</div>
    }
}

export default ItemPreview