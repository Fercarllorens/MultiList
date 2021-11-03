import React, { useEffect } from 'react'
import './MultimediaContent.css'
import MultimediaContentLogic from './MultimediaContentLogic'
//componentes
import AddList from './AddList/AddList'
import CommentSection from '../CommentSection/CommentSection'

interface Props{
    data : JSON | null;
    type: string | null;
    contentId: string;
}

let options: string[] = ["Select...", "Planning to view", "Droped", "Watching", "Finished"]

const MultimediaContent: React.FC<Props> = (props) => {
    const {listTop, imageUrl, trailerUrl, listBottom, setWatching, progress, watching, rating, 
        type_query, id_query, getData, getProgress, handleAddContent, handleDeleteContent, handleUpdateProgress, register, handleSubmit, added, isContentAdded} = MultimediaContentLogic(props)



    useEffect(() => {
        isContentAdded()
        getData()
        getProgress()
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
                <p className="data"><span className="label-data-type" style={{ backgroundColor: listTop[4] != null ? listTop[4] : 'transparent', borderRadius:20}}>{listTop[1]}</span> - {listTop[2]} - {listTop[3]}</p>
            </div>
            <div className="image">
                <img src={imageUrl != null ? imageUrl : 'https://us.123rf.com/450wm/seetwo/seetwo1907/seetwo190700208/126635447-ning%C3%BAn-signo-vac%C3%ADo-c%C3%ADrculo-tachado-rojo-signo-no-permitido-aislar-sobre-fondo-blanco-ilustraci%C3%B3n-vec.jpg?ver=6'} alt="No disponible" />
            </div>
            <div className="data-container-trailer">
            {
                id_query == "tt3398228"?
                    <iframe className="trailer" width="560" height="315" src="https://www.youtube.com/embed/i1eJMig5Ik4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                : <></>
            }
            {type_query != "song" && id_query != "tt3398228" ?
                <img className="trailer" src={'https://us.123rf.com/450wm/seetwo/seetwo1907/seetwo190700208/126635447-ning%C3%BAn-signo-vac%C3%ADo-c%C3%ADrculo-tachado-rojo-signo-no-permitido-aislar-sobre-fondo-blanco-ilustraci%C3%B3n-vec.jpg?ver=6'} alt="No disponible" /> :
                <></>
            }
            </div>
            <div className="data-container-bottom">
                <h4 className="bottom-title">MÁS INFORMACIÓN</h4>
                {listBottom.map((item) => {
                    return (item != '' && item != null)? <p className="data">{item}</p> : <></>;
                })}
            </div>
            <div className="rating-container">
                <p>Rating</p>
                <p>{rating}%</p>
            </div>
            <div className="comment-holder">
                <CommentSection content_id={id_query} user_id={localStorage.getItem('user_id')}/>
            </div>
            {
            added ? 
            <button className="add-content-btn" onClick={handleDeleteContent}>Delete from list</button>:
            <button className="add-content-btn" onClick={handleAddContent}>Add to list</button>
            }
            <form className="state-form" onSubmit={handleSubmit(handleUpdateProgress)}>
                <select value={watching} onChange={(e) => {setWatching(e.target.value);}}>
                {/* <select defaultValue={watching} {...register("watching_state")}> */}
                    {
                    options.map((element, index) => {
                        return(
                            
                            <option key={index} value={element}>{element}</option>
                            
                        )
                    })                   
                    }
                </select>
                { watching==="Watching" && (
                    <input type="text" defaultValue={progress != null? progress : "Sin registrar"} {...register("watching_progress")}/>
                )}
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default MultimediaContent
