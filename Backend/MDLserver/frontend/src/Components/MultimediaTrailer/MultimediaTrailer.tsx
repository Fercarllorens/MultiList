import React from 'react'
import MultimediaTrailerLogic  from './MultimediaTrailerLogic'
import './MultimediaTrailer.css'

interface Props{
    trailer: string;
}

const MultimediaTrailer = (props:Props) => {
    const {trailer} = MultimediaTrailerLogic(props)
        let url: string 
        if(trailer == null){url = ''}
        else{ url = trailer}
        return (
        <div className="data-container">
            <video>
                <source src={url} type=""></source>
            </video>
        </div>
    )
}

export default MultimediaTrailer