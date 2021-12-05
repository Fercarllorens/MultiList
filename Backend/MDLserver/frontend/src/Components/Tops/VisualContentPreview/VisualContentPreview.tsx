import React from 'react'
import VisualContentPreviewLogic from './VisualContentPreviewLogic'
import {VisualContent} from '../TopsLogic'
import './VisualContent.css'

interface Props{
    content: VisualContent;
    type: "films" | "series";
    showSheet: (id: string, type: "films" | "series" | "songs") => void;
}

const VisualContentPreview: React.FC<Props> = ({content, type, showSheet}) => {
    const {} = VisualContentPreviewLogic()

    return (
        <div className="content" onClick={() => {showSheet(content.id.toString(), type)}}>
            <img className="img" src={content.img} height="100%" width="100%"></img>
        </div>
    )
}
export default VisualContentPreview