import React from 'react'
import MultimediaTopDataLogic  from './MultimediaTopDataLogic'
import './MultimediaTopData.css'

interface Props{
    list: string[] | null;
}

const MultimediaTopData: React.FC<Props> = (props) => {
    const {title, type, year, genre, color} = MultimediaTopDataLogic(props)

    return (
        <div className="data-container-top">
            <h3 className="title-top-data">{title}</h3>
            <p className="data"><span className="label-data-type" style={{ backgroundColor: color != null ? color : 'transparent', borderRadius:20}}>{type}</span> - {year} - {genre}</p>
        </div>
    )
}

export default MultimediaTopData

