import React, { useEffect } from 'react'
import TopsLogic from './TopsLogic'
import './Tops.css'
import VisualContentPreview from './VisualContentPreview/VisualContentPreview'
import AudioContentPreview from './AudioContentPreview/AudioContentPreview'

interface Props{
    
}

const Tops: React.FC = (props) => {
    const { movies, tv, songs, fetchMovies, fetchTv, fetchSongs, showSheet} = TopsLogic()

    useEffect(() => {
        fetchMovies()
        fetchTv()
        fetchSongs()
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
                                <VisualContentPreview content={{id: element.id, img: element.img, name: element.name}} type="film" showSheet={showSheet}/>
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
                                <VisualContentPreview content={{id: element.id, img: element.img, name: element.name}} type="series" showSheet={showSheet}/>
                            ))
                        : 'No results'
                    }
                    </>

                </div>
            </div>
            <div className="series">
                Top songs
                <div className="songs-list">

                <>
                {
                    songs!==undefined ?
                        songs.map((element, index) => (
                            index<20 && <AudioContentPreview content={{id: element.id, img: element.img, name: element.name, authors: element.authors}} tier={(index+1).toString()} showSheet={showSheet}/>
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