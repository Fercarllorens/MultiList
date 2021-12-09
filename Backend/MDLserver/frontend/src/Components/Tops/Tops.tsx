import React, { useEffect } from 'react'
import TopsLogic from './TopsLogic'
import './Tops.css'
import VisualContentPreview from './VisualContentPreview/VisualContentPreview'
import AudioContentPreview from './AudioContentPreview/AudioContentPreview'
import ContentPreview from './ContentPreview/ContentPreview'

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
                        movies?
                            movies.map((element, index) => (
                                <VisualContentPreview key={index} content={{id: element.id, img: element.img, name: element.name}} type="film"/>
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
                        tv?
                            tv.map((element, index) => (
                                <VisualContentPreview key={index} content={{id: element.id, img: element.img, name: element.name}} type="series"/>
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
                    songs?
                        songs.map((element, index) => (
                            index<20 && 
                            <AudioContentPreview key={index} content={{id: element.id, img: element.img, name: element.name, authors: element.authors}} tier={(index+1).toString()}/>
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