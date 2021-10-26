import React from 'react'
//import MultmediaContentLogic from './MultimediaContentLogic'
import './MultimediaContent.css'
import MultimediaContentLogic from './MultimediaContentLogic'
//componentes
import MultimediaTopData from '../MultimediaTopData/MultimediaTopData'
import MultimediaTrailer from '../MultimediaTrailer/MultimediaTrailer'
import MultimediaBottomData from '../MultimediaBottomData/MultimediaBottomData'
import AddList from '../AddList/AddList'
import Pic from '../Pic/Pic'
import AddListLogic from '../AddList/AddListLogic'


interface Props{
    data : JSON | null;
    type: string | null;
}

const MultimediaContent: React.FC<Props> = (props) => {
    const {listTop, imageUrl, trailerUrl, listBottom} = MultimediaContentLogic(props)
  
    return (
        <div className="multimedia-cont">
            <AddList contentId={""} />
            <MultimediaTopData list={listTop} />
            <Pic url={imageUrl} />
            <MultimediaTrailer trailer={trailerUrl}/>
            <MultimediaBottomData list={listBottom}/> 
        </div>
    )
}

export default MultimediaContent
