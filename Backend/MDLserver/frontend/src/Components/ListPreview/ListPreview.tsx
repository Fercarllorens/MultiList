import React, { useEffect } from "react";
import './ListPreview.css'
import ListPreviewLogic, { Props } from "./ListPreviewLogic";
import { Link } from 'react-router-dom'

const ListPreview: React.FC<Props> = (props) => {
    const { show_list, backgrounds } = ListPreviewLogic(props)

    return props && (
        <div className="list-preview"
            style={{ backgroundColor: backgrounds[props.type] }}
            onClick={() => { show_list(props.id) }}>
            <h4> {props.name} </h4>
        </div>
    )
}

export default ListPreview
