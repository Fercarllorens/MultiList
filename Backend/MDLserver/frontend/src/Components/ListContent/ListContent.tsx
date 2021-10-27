import React from 'react';
import './ListContent.css'
import ListContentLogic from './ListContentLogic';
import SongPreview from '../SongPreview/SongPreview'


const ListContent = () => {
    const {data, setData, getData} = ListContentLogic()

    return (
        <div className="list-content"> 
            {
                data && (
                    data.map(item => {
                        return (<div><p>item.name</p></div>)
                    })
                )
            }      
        </div>
    )
}

export default ListContent