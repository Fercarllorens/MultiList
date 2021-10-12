import React from 'react'
import MultimediaBottomDataLogic  from './MultimediaBottomDataLogic'
import './MultimediaBottomData.css'

interface Data{
    list: string[] |null;
}

const MultimediaBottomData = (props:Data) => {
    const {duration, episodes, seasons, date} = MultimediaBottomDataLogic(props)
    return (
        <div className="data-container">
            <p className="data">{duration}</p>
            <p className="data">{episodes}</p>
            <p className="data">{seasons}</p>
            <p className="data">{date}</p>
        </div>
    )
}

export default MultimediaBottomData
