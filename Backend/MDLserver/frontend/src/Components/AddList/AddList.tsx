import React from 'react';
import './ListContent.css'
import AddListLogic from './AddListLogic';

interface Props{
    contents: JSON | null;
    name: string | null;
}

const  AddList: React.FC = () => {
    return (
        <button className="add-button" type="submit">+ Add to list</button>
    )
}

export default AddList