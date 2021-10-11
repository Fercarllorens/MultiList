import React from 'react'
import SongPreviewLogic from './SongPreviewLogic'
import './SongPreview.css'

interface Props{

}

const SongPreview: React.FC<Props> = (props) => {
    const {} = SongPreviewLogic()

    return (
        <div className="SongPreviewContainer" onClick={() => console.log("song clicked")}>
            <div className="picture-div">
                <img className="picture" src="https://i.scdn.co/image/107819f5dc557d5d0a4b216781c6ec1b2f3c5ab2" height="130" width="130"></img>
            </div>
            <div className="song-info">
                <div className="song-name">
                    Name
                </div>
                <div className="song-author">
                    Author
                </div>
                <div className="song-date">
                    Date
                </div>
                <div className="song-genre">
                    Genre
                </div>
            </div>
        </div>
    )
}
export default SongPreview