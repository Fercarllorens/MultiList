import React from 'react';
import './ListContent.css'
import ListContentLogic from './ListContentLogic';

interface Props{
    type: string;
}

const ListContent: React.FC<Props> = (props) => {
    const {contents} = ListContentLogic(props)

    return (
        <div className="list-content">
            
        </div>
    )
}

export default ListContent