import React from 'react';
import './ListContent.css'
import AddListLogic from './AddListLogic';
import { userInfo } from 'os';

interface Props{
    contentId: string;
}

const  AddList: React.FC<Props> = (props) => {
    if (localStorage.getItem('authToken')){
        return (
            <button className="add-button" onSubmit={AddListLogic(props.contentId)} type="submit">+ Add to list</button>
        )
    }
    return (<p className="placeholder-button">Log-in to start managin your own lists</p>)
}

export default AddList