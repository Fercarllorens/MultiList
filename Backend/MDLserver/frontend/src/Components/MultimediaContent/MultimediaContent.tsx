import React, { useEffect } from 'react'
import './MultimediaContent.css'
import MultimediaContentLogic from './MultimediaContentLogic'
//componentes
import AddList from './AddList/AddList'
import CommentSection from '../CommentSection/CommentSection'
import { Link } from 'react-router-dom'
import LinkToContent from '../LinkToContent/LinkToContent'

interface Props {
    data: JSON | null;
    type: string | null;
    contentId: string;
}

let options: string[] = ["Select...", "Planning to view", "Droped", "Watching", "Finished"]

const MultimediaContent: React.FC<Props> = (props) => {
    const { listTop, imageUrl, trailerUrl, listBottom, setWatching, progress, watching, addToListPremium, setAddToListPremium, rating,
        type_query, id_query, getData, getProgress, handleAddContent, handleDeleteContent,
        handleUpdateProgress, handleAddToListPremium, register, handleSubmit, added, isContentAdded,
        lists, getUserLists, selectedListName, setSelectedListName, getIdTMDB, artists, showArtist } = MultimediaContentLogic(props)

    useEffect(() => {
        isContentAdded()
        getData()
        getProgress()
        getUserLists()
    }, [])

    return (
        <div className="multimedia-cont">
            {/* <div className="progress-cont">
                <select className="state">
                    {
                        options.map(element => {
                            progress?.state == element? 
                                <option selected>{element}</option> :
                                <option>{element}</option>
                        })
                    }
                </select>
                {
                    progress?.state == "Watching"?
                    <input type="text" value={progress?.progress != null? progress.progress : ""} className="progress"></input> :
                    <></>                    
                }
                <button className="submit-progress">Update</button>
            </div> */}
            {/*<AddList contentId={id_query!= null? id_query: ""} type={type_query!= null? type_query: ""} />*/}
            <div className="data-container-top">
                <h3 className="title-top-data">{listTop[0]}</h3>
            </div>
            <div className="image">
                <img src={imageUrl != null ? imageUrl : 'https://us.123rf.com/450wm/seetwo/seetwo1907/seetwo190700208/126635447-ning%C3%BAn-signo-vac%C3%ADo-c%C3%ADrculo-tachado-rojo-signo-no-permitido-aislar-sobre-fondo-blanco-ilustraci%C3%B3n-vec.jpg?ver=6'} alt="No disponible" />
            </div>
            <div className="data-container-trailer">
                {console.log(type_query)}
                {type_query !== "song" && trailerUrl != null?
                        <iframe className="trailer" width="560" height="315" src={trailerUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> : (trailerUrl && <audio src={trailerUrl} preload="none" controls></audio>)
                }
            </div>
            <div className="data-container-bottom">
                <h4 className="bottom-title">MÁS INFORMACIÓN</h4>
                <p className="cont-link">
                    {type_query == "song" ? listBottom.map((item) => {
                        return (item != '' && item != null) ? <p className="data">{item}</p> : <></>;
                    }) : listBottom.map((item) => {
                        return (item != '' && item != null) ? <h5 className="data">{item}</h5> : <></>;
                    })}
                    {artists.map((item, index) => {
                        if (index == 0) return (item != undefined && item != null) ? <a className='artist-link' onClick={() => showArtist(item.id)}>{item.name}</a> : <></>;
                        else return (item != undefined && item != null) ? <a className='artist-link' onClick={() => showArtist(item.id)}>, {item.name}</a> : <></>;
                    })}
                </p>
                {type_query == 'film' || type_query == 'series' ?
                    <h4 className="casting-label" onClick={() => { getIdTMDB() }}>Casting</h4>
                    :
                    <></>}
            </div>
            <div className="rating-container">
                <p>Rating</p>
                <p>{rating}%</p>
            </div>
            <div className="comment-holder">
                <CommentSection content_id={id_query} user_id={localStorage.getItem('user_id')} />
            </div>
            {
                added ?
                    <button className="add-content-btn" onClick={handleDeleteContent}>Delete from list</button> :
                    lists?.length == 1 || lists?.length == 0 ?
                        <button className="add-content-btn" onClick={handleAddContent}>Add to list</button> :
                        <form className="state-form-add-to-custom-list" onSubmit={handleSubmit(handleAddToListPremium)}>
                            <select value={addToListPremium} onChange={(e) => { setAddToListPremium(e.target.value); setSelectedListName(e.target.value); }}>
                                {
                                    lists?.map((element, index) => {
                                        return (

                                            <option key={index} value={element.name}>{element.name}</option>

                                        )
                                    })
                                }
                            </select>
                            <input type="submit" value="Submit" />
                        </form>
            }
            <form className="state-form-add-content" onSubmit={handleSubmit(handleUpdateProgress)}>
                <select value={watching} onChange={(e) => { setWatching(e.target.value); }}>
                    {/* <select defaultValue={watching} {...register("watching_state")}> */}
                    {
                        options.map((element, index) => {
                            return (

                                <option key={index} value={element}>{element}</option>

                            )
                        })
                    }
                </select>
                {watching === "Watching" && (
                    <input type="text" defaultValue={progress != null ? progress : "Sin registrar"} {...register("watching_progress")} />
                )}
                <input className="btn-submit" type="submit" value="Submit" />
            </form>
            <div className="contentlinks">
                <LinkToContent icon="https://img.icons8.com/color/48/000000/twitter--v1.png" website="https://twitter.com" alt="Share on twitter" />
            </div>
        </div>
    )
}

export default MultimediaContent
