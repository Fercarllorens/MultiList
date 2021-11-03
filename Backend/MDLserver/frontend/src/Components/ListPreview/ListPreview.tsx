import React, {useEffect} from "react";
import './ListPreview.css'
import ListPreviewLogic from "./ListPreviewLogic";
import { Link } from 'react-router-dom'
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
    const {list, getData, show_list} = ListPreviewLogic(props)
    useEffect(() => {
        getData()
     }, [])
    return(
        <div className="list" onClick={() => {show_list(list? list.type: "")}}>
            <h4 className="title"> {list != null? list.name : ""} </h4>
        </div>
    )
}

export default ListPreview
