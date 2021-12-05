import React, { useEffect } from 'react'
import TopsLogic from './TopsLogic'
import './Tops.css'
import VisualContentPreview from './VisualContentPreview/VisualContentPreview'

interface Props{
    
}

const Tops: React.FC = (props) => {
    const { movies, tv, fetchMovies, fetchTv} = TopsLogic()

    useEffect(() => {
        fetchMovies()
        fetchTv()
    }, [])

    return (
        <div className="tops-container">
            <div className="movies">
                Top films
                <div className="movies-list">

                    <>
                    {
                        movies!==undefined ?
                            movies.map((element, index) => (
                                <VisualContentPreview content={{id: element.id, img: element.img, name: element.name}}/>
                            ))
                        : 'No results'
                    }
                    </>

                </div>
            </div>
            <div className="series">
                Top series
                <div className="movies-list">

                    <>
                    {
                        tv!==undefined ?
                            tv.map((element) => (
                                <VisualContentPreview content={{id: element.id, img: element.img, name: element.name}}/>
                            ))
                        : 'No results'
                    }
                    </>

                </div>
            </div>
        </div>
    )
}
export default Tops