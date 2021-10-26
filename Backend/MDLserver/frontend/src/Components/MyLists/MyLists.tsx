import React from "react";
import './MyLists.css'
import MyListsLogic from "./MyListsLogic";
import ListPreview from "../ListPreview/ListPreview";

const MyLists: React.FC = () => {
    const {lists} = MyListsLogic()
    return(
        <div className="list-content">
            {
                lists!==undefined ?
                    lists.map((element) => (
                        <ListPreview id={element} />
                    ))
                : 'No results'
            }
        </div>
    )
}

