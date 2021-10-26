import React from 'react';
import './ListContent.css'
import ListContentLogic from './ListContentLogic';
import SongPreview from '../SongPreview/SongPreview'
interface Props{
    id: string;
    type: string;
}

const ListContent: React.FC<Props> = (props) => {
    const {contents} = ListContentLogic(props)

    return (
        <div className="list-content"> 
            {/*
                
                    contents!==null ?
                        contents.map((element) => (
                            <SongPreview song={element} />
                        ))
                    : ""
                
                        */}      
        </div>
    )
}

export default ListContent