import React from 'react';
import './ListContent.css'
import AddListLogic from './AddListLogic';
import { userInfo } from 'os';



const  AddList: React.FC = () => {
    if (localStorage.getItem('authToken')){
        return (
            <button className="add-button" onSubmit={AddListLogic()} type="submit">+ Add to list</button>
        )
    }
    return (<p>Log-in to start managin your own lists</p>)
}

export default AddList