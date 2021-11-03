import React, { useEffect } from 'react';
import './ListContent.css'
import ListContentLogic from './ListContentLogic';
import SongPreview from '../ItemPreview/SongPreview/SongPreview'


const ListContent = () => {
    const {data, getData, list} = ListContentLogic()
    useEffect(() => {
        getData()
    }, [])
    console.log(data)
    return (
        <div className="list-content"> 
            {
                data !== null ? (
                    data.map((item) => {
                        return (
                        <div className="div-item"><h4>{item.name}</h4></div>
                        )
                    })):
                 <p>nothing</p>
            }      
        </div>
    )
}

export default ListContent