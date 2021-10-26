import React from 'react'
import SeriesPreviewLogic from './SeriesPreviewLogic'
import './SeriesPreview.css'

interface Series{
    id: string
    name: string;
    img: string;
}

interface Props{
    series: Series
}

const SeriesPreview: React.FC<Props> = ({series}) => {
    const {show_series} = SeriesPreviewLogic()

    return (
        <div className="SeriesPreviewContainer" onClick={() => {show_series()}}>
            <div className="PictureDiv">
                <img className="Picture" src={series.img} height="130" width="130"></img>
            </div>
            <div className="SeriesInfo">
                <div className="SeriesName">
                    {series.name}
                </div>
            </div>
        </div>
    )
}
export default SeriesPreview