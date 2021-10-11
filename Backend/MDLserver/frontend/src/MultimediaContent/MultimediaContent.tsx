import React from 'react'
//import MultmediaContentLogic from './MultimediaContentLogic'
import './MultimediaContent.css'
import MultimediaContentLogic from './MultimediaContentLogic'
//componentes
import MultimediaTopData from '../MultimediaTopData/MultimediaTopData'
import MultimediaTrailer from '../MultimediaTrailer/MultimediaTrailer'
import MultimediaBottomData from '../MultimediaBottomData/MultimediaBottomData'
import { Interface } from 'readline'

interface Props{
    data : JSON;
}

const MultimediaContent = (props:Props) => {
    const {list_top, trailer_url, list_bottom} = MultimediaContentLogic(props)

    return (
        <div className="multimedia-cont">
            <MultimediaTopData list={list_top} />
            <MultimediaTrailer trailer={trailer_url}/>
            <MultimediaBottomData list={list_bottom}/>
        </div>
    )
}

export default MultimediaContent
