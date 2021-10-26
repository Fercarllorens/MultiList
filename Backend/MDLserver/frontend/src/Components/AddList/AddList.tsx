import React from 'react';
import './AddList.css'
//import AddListLogic from './AddListLogic';
import { userInfo } from 'os';
import { getAllJSDocTags } from 'typescript';

interface Props{
    contentId: string;
    type: string;
}

const  AddList: React.FC<Props> = (props) => {
    
    if (localStorage.getItem('user_id')){
        return (
            <button className="add-button"  type="submit">+ Add to list</button>
        )
    }
    return (<p className="placeholder-button">Log-in to start managin your own lists</p>)
}

export default AddList