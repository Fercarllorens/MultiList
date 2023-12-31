import React from 'react'
import FindSeriesLogic from './FindSeriesLogic'
import SeriesPreview from '../../ItemPreview/SeriesPreview/SeriesPreview'
import './FindSeries.css'

interface Series {
    id: string
    name: string;
    img: string;
}

interface Props {
    series: Series[] | undefined
}

const FindSeries: React.FC<Props> = ({ series }) => {
    const { } = FindSeriesLogic()

    return (
        <div className="FindSeriesContainer">
            {
                series ?
                    series.map((element) => (
                        <SeriesPreview series={element} key={element.name} />
                    ))
                    : <p className="nrf">No results found ...</p>
            }
        </div>
    )
}
export default FindSeries