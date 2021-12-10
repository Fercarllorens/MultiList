import React from 'react'
import SeriesPreviewLogic from './SeriesPreviewLogic'
import '../ContentPreview.css'

interface Series{
    name: string;
    id: string
    img: string;
}

interface Props{
    series: Series
}

const SeriesPreview: React.FC<Props> = ({series}) => {
    const {show_series} = SeriesPreviewLogic()

    return (
        <div className="PreviewContainer" onClick={() => {show_series(series.id)}}>
            <div className="PictureDiv">
                <img className="Picture" src={series.img} height="130" width="130"></img>
            </div>
            <div className="Info">
                <div className="Name">
                    {series.name}
                </div>
            </div>
        </div>
    )
}
export default SeriesPreview