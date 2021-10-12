import React from 'react'
//import MultmediaContentLogic from './MultimediaContentLogic'
import './MultimediaContent.css'
import MultimediaContentLogic from './MultimediaContentLogic'
//componentes
import MultimediaTopData from '../MultimediaTopData/MultimediaTopData'
import MultimediaTrailer from '../MultimediaTrailer/MultimediaTrailer'
import MultimediaBottomData from '../MultimediaBottomData/MultimediaBottomData'
import Pic from '../Pic/Pic'
import { Interface } from 'readline'

interface Props{
    data : JSON;
}

const MultimediaContent = (props:Props) => {
    const {listTop, imageUrl, trailerUrl, listBottom} = MultimediaContentLogic(props)
    let topList: string[] = ['', '', '']
    if (listTop != null){topList = listTop} 
    let Iurl: string = ''
    if (imageUrl != null){Iurl = imageUrl}
    let Turl: string = ''
    if (trailerUrl != null) {Turl = trailerUrl}
    let bottomList: string[] = ['', '', '', '']
    if (listBottom != null) {bottomList = listBottom}
    return (
        <div className="multimedia-cont">
            <MultimediaTopData list={topList} />
            <Pic url={Iurl} />
            <MultimediaTrailer trailer={Turl}/>
            <MultimediaBottomData list={bottomList}/>
        </div>
    )
}

export default MultimediaContent
