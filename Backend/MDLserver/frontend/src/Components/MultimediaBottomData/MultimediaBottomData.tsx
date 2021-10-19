import React from 'react'
import MultimediaBottomDataLogic  from './MultimediaBottomDataLogic'
import './MultimediaBottomData.css'

interface Props{
    list: string[] |null;
}

const MultimediaBottomData: React.FC<Props> = (props) => {
    const {duration, episodes, seasons, date, album, authorOrBand} = MultimediaBottomDataLogic(props)
    return (
        <div className="data-container-bottom">
            <h4 className="bottom-title">MÁS INFORMACIÓN</h4>
            <p className="data">{duration}</p>
            <p className="data">{episodes}</p>
            <p className="data">{seasons}</p>
            <p className="data">{date}</p>
            <p className="data">{album}</p>
            <p className="data">{authorOrBand}</p>
        </div>
    )
}

export default MultimediaBottomData
