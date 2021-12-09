import React from 'react'
import AudioContentPreviewLogic from './AudioContentPreviewLogic'
import {AudioContent} from '../TopsLogic'
import './AudioContentPreview.css'

interface Props{
    content: AudioContent;
    tier: string;
    //showSheet: (id: string, type: "film" | "series" | "song") => void;
}

const AudioContentPreview: React.FC<Props> = ({content, tier}) => {
    const { showSheet } = AudioContentPreviewLogic()

    return (
        <div className="preview-container" onClick={() => {showSheet(content.id.toString(), "song")}}>
            <div className="image-container">
                <img className="img" src={content.img} height="100%" width="100%"></img>
            </div>
            <div className="song-info">
                <div className="song-name">
                    {content.name}
                </div>
                <div className="song-authors">
                    {content.authors}
                </div>
                {/* <div className="song-tier">
                    {tier}
                </div> */}
            </div>
        </div>
    )
}
export default AudioContentPreview