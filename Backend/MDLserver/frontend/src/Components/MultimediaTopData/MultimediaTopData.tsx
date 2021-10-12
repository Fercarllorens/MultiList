import React from 'react'
import MultimediaTopDataLogic  from './MultimediaTopDataLogic'
import './MultimediaTopData.css'

interface Data{
    list: string[];
}

const MultimediaTopData = (props:Data) => {
    const {title, type, year, genre, color} = MultimediaTopDataLogic(props)
    let color_type:string
    if(color != null) { color_type= color}
    else{color_type= 'transparent'}
    return (
        <div className="data-container">
            <h3 className="title-top-data">{title}</h3>
            <p className="data"><span className="label-data-type" style={{ backgroundColor: color_type, borderRadius:20}}>{type}</span> - {year} - {genre}</p>
        </div>
    )
}

export default MultimediaTopData

