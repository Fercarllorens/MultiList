import React, { useEffect } from 'react'
import './MultimediaContent.css'
import MultimediaContentLogic from './MultimediaContentLogic'
//componentes
import MultimediaTopData from './MultimediaTopData/MultimediaTopData'
import MultimediaTrailer from './MultimediaTrailer/MultimediaTrailer'
import MultimediaBottomData from './MultimediaBottomData/MultimediaBottomData'
import AddList from './AddList/AddList'
import Pic from '../Pic/Pic'


interface Props{
    data : JSON | null;
    type: string | null;
    contentId: string;
}

let options: string[] = ["Select...", "Planning to view", "Droped", "Watching", "Finished"]

const MultimediaContent: React.FC<Props> = (props) => {
    const {listTop, imageUrl, trailerUrl, listBottom, progress, watching, setWatching,
        type_query, id_query, getData, handleAddContent, handleUpdateProgress, register, handleSubmit} = MultimediaContentLogic(props)

    console.log('se han establecido')

    useEffect(() => {
        getData()
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
            <Pic url={imageUrl} />
            <MultimediaTrailer trailer={trailerUrl}/>
            <div className="data-container-bottom">
                <h4 className="bottom-title">MÁS INFORMACIÓN</h4>
                {listBottom.map((item) => {
                    return (item != '' && item != null)? <p className="data">{item}</p> : <></>;
                })}
            </div>
            <button className="add-content-btn" onClick={handleAddContent}><i className="fas fa-arrow-up"></i></button>
            <form onSubmit={handleSubmit(handleUpdateProgress)}>
                <select value={watching} onChange={(e) => {setWatching(e.target.value); register("watching_state")}}>
                    <option value="Whatever"></option>
                </select>
                { watching==="watching" && (
                    <input type="text" {...register("watching_progress")}/>
                )}
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default MultimediaContent
