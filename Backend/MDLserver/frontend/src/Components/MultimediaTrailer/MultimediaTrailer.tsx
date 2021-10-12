import React from 'react'
import MultimediaTrailerLogic  from './MultimediaTrailerLogic'
import './MultimediaTrailer.css'

interface Props{
    trailer: string | null;
}

const MultimediaTrailer = (props:Props) => {
    const {trailer} = MultimediaTrailerLogic(props)
        return (
        <div className="data-container">
            <video>
                <source src={trailer != null ? trailer : 'NoVideo'} type=""></source>
            </video>
        </div>
    )
}

export default MultimediaTrailer