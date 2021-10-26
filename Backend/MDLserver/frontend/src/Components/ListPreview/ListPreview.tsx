import React from "react";
import './ListPreview.css'
import ListPreviewLogic from "./ListPreviewLogic";

interface Props{
    id: string;
}

interface List{
    name: string
    type: string
    contents: string[]
    user_id: string
}

const ListPreview: React.FC<Props> = (props) => {
    const {list} = ListPreviewLogic(props)
    return(
        <div className="list">
            <h4 className="title">{list != null? list.name : ""}</h4>
        </div>
    )
}

export default ListPreview
