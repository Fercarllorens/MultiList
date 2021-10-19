import React from 'react'
import MultimediaTrailerLogic  from './MultimediaTrailerLogic'
import './MultimediaTrailer.css'

interface Props{
    trailer: string | null;
}

const MultimediaTrailer: React.FC<Props> = (props) => {
    const {trailer} = MultimediaTrailerLogic(props)
        return (
        <div className="data-container-trailer">
            <video>
                <source src={trailer != null ? trailer : 'NoVideo'} type=""></source>
            </video>
        </div>
    )
}

export default MultimediaTrailer