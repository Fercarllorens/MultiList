import React from 'react'
//import MultmediaContentLogic from './MultimediaContentLogic'
import './MultimediaContent.css'
import MultimediaContentLogic from './MultimediaContentLogic'
//componentes
import MultimediaTopData from '../MultimediaTopData/MultimediaTopData'
import MultimediaTrailer from '../MultimediaTrailer/MultimediaTrailer'
import MultimediaBottomData from '../MultimediaBottomData/MultimediaBottomData'
import Pic from '../Pic/Pic'


interface Props{
    data : JSON | null;
}

const MultimediaContent: React.FC<Props> = (props) => {
    const {listTop, imageUrl, trailerUrl, listBottom} = MultimediaContentLogic(props)
  
    return (
        <div className="multimedia-cont">
            {/*
            <MultimediaTopData list={[""]} />
            <Pic url={""} />
            <MultimediaTrailer trailer={""}/>
            <MultimediaBottomData list={[""]}/>
            */}
        </div>
    )
}

export default MultimediaContent
