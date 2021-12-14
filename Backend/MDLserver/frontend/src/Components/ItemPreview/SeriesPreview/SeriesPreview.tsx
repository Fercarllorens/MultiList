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
        !series.img.includes('null') ?
            <div className="content" onClick={() => {show_series(series.id)}}>
                <img className="Picture" src={series.img} height="130" width="130"></img>
                <div className="Info">
                    {/* <div className="Name">
                        {film.name}
                    </div> */}
                </div>
            </div> :
            <></>
    )
}
export default SeriesPreview