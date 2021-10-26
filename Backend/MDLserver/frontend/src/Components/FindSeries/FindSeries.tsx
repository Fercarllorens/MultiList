import React from 'react'
import FindSeriesLogic from './FindSeriesLogic'
import SeriesPreview from '../SeriesPreview/SeriesPreview'
import './FindSeries.css'

interface Series{
    id: string
    name: string;
    img: string;
}

interface Props{
    series: Series[] | undefined
}

const FindSeries: React.FC<Props> = ({series}) => {
    const {} = FindSeriesLogic()

    return (
        <div className="FindSeriesContainer">
            <>
            {
                series!==undefined ?
                    series.map((element) => (
                        <SeriesPreview series={element} />
                    ))
                : 'No results'
            }
            </>
        </div>
    )
}
export default FindSeries