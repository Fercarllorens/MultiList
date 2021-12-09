import React from 'react'
import ContentPreviewLogic from './ContentPreviewLogic'
import './ContentPreview.css'
import {VisualContent} from '../TopsLogic'
import {AudioContent} from '../TopsLogic'
import VisualContentPreview from '../VisualContentPreview/VisualContentPreview'
import AudioContentPreview from '../AudioContentPreview/AudioContentPreview'

interface Props{
    content: any;
    type: "film" | "series" | "song";
}

const ContentPreview: React.FC<Props> = (props) => {
    const {} = ContentPreviewLogic(props)

    switch(props.type){
                case "film":
                    return <VisualContentPreview content={{id: props.content.id, img: props.content.img, name: props.content.name}} type="film"/>
                    break;
                case "series": 
                    return <VisualContentPreview content={{id: props.content.id, img: props.content.img, name: props.content.name}} type="series"/>
                    break; 
                case "song": 
                    return <AudioContentPreview content={{id: props.content.id, img: props.content.img, name: props.content.name, authors: props.content.authors}}/>
                    break; 
                default:
                    return <></>
            }

}
export default ContentPreview