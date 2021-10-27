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
    const {list, getData} = ListPreviewLogic(props)
    useEffect(() => {
        getData()
     }, [])
    return(
        <div className="list">
            <Link className="title" to='/List'> {list != null? list.name : ""} </Link>
        </div>
    )
}

export default ListPreview
