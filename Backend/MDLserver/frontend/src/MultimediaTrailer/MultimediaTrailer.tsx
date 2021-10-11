import React from 'react'
import MultimediaTrailerLogic  from './MultimediaTrailerLogic'
import './MultimediaTrailer.css'

interface Props{
    trailer: string;
}

const MultimediaTrailer = (props:Props) => {
    const {trailer} = MultimediaTrailerLogic(props)
    return (
        <div className="data-container">
            <video>
                <source src={trailer} type=""></source>
            </video>
        </div>
    )
}

export default MultimediaTrailer