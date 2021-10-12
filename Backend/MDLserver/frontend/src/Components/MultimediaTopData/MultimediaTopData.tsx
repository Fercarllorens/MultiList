import React from 'react'
import MultimediaTopDataLogic  from './MultimediaTopDataLogic'
import './MultimediaTopData.css'

interface Data{
    list: string[] | null;
}

const MultimediaTopData = (props:Data) => {
    const {title, type, year, genre, color} = MultimediaTopDataLogic(props)

    return (
        <div className="data-container">
            <h3 className="title-top-data">{title}</h3>
            <p className="data"><span className="label-data-type" style={{ backgroundColor: color != null ? color : 'transparent', borderRadius:20}}>{type}</span> - {year} - {genre}</p>
        </div>
    )
}

export default MultimediaTopData

