import React from 'react'
import VisualContentPreviewLogic from './VisualContentPreviewLogic'
import { VisualContent } from '../TopsLogic'
import './VisualContentPreview.css'

interface Props {
    content: VisualContent;
    type: "film" | "series";
}

const VisualContentPreview: React.FC<Props> = ({ content, type }) => {
    const { showSheet } = VisualContentPreviewLogic()

    return (
        <div className="content" onClick={() => { showSheet(content?.id.toString(), type) }}>
            <img className="img" src={content?.img} height="100%" width="100%"></img>
        </div>
    )
}
export default VisualContentPreview