import React, {useEffect} from "react";
import CastingLogic from "./CastingLogic";
import './Casting.css'


const Casting: React.FC = () => {
    const {name_query, get_casting, img_query, listCasting} = CastingLogic()
    useEffect(() => {
        get_casting()
    }, [])
    return(
        <div className="multimedia-cont">
            <h2 className="title-top-data">{name_query} Casting</h2>
            <img className="img-cast" src={img_query}></img>
            <h3 className="cast-label">Casting:</h3>
            <div className="cast-cont">
            <>
                {
                        listCasting.map((element) => (
                            
                            <div className="actor-cont">
                                <p className="actor-name">{element.name}</p>
                                <p className="actor-character">{element.character}</p>
                            </div>  
                    )) 
                }
            </>
            </div>
        </div>
    )
}

export default Casting