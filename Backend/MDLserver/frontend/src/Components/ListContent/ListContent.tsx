import React from 'react';
import './ListContent.css'
import ListContentLogic from './ListContentLogic';

interface Props{
    contents: JSON | null;
    name: string | null;
}

const ListContent: React.FC<Props> = (props) => {
    const {} = ListContentLogic(props)

    return (
        <div className="list-content">
            
        </div>
    )
}

export default ListContent