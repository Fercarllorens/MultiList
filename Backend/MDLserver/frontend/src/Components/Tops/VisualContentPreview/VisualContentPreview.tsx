import React from 'react'
import VisualContentPreviewLogic from './VisualContentPreviewLogic'
import {VisualContent} from '../TopsLogic'
import './VisualContent.css'

interface Props{
    content: VisualContent;
}

const VisualContentPreview: React.FC<Props> = ({content}) => {
    const {} = VisualContentPreviewLogic()

    return (
        <div className="content">
            <img className="img" src={content.img} height="100%" width="100%"></img>
        </div>
    )
}
export default VisualContentPreview