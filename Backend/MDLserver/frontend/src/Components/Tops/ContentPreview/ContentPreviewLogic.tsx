import React, { useState } from 'react'
import { fetchHandler, fetchHandlerCb } from '../../fetchHandler'

export interface Props {
    id: number;
    name: string;
    external_id: string;
    total_rating: null | number;
    comments: null | any[];
    type: "film" | "series" | "song";
}
const ContentPreviewLogic = (props: Props) => {
    const [item, setItem] = useState<null | any>(null)

    function getItem() {
        switch (props.type) {
            case "song":
                fetchHandlerCb(`spotify/get-track?id=${props.external_id}&user=${localStorage.getItem('user_id')}`, 'GET', null, (json) => { console.log(json) }); break;
            case "series":
                fetchHandlerCb(`video/get-show-by-id?id=${props.external_id}`, 'GET', null, (json) => { console.log(json) }); break;
            case "film":
                fetchHandlerCb(`video/get-film-by-id?id=${props.external_id}`, 'GET', null, (json) => { console.log(json) }); break;
        }
    }

    function processItem(json: any) {

    }

    return { item, getItem }
}
export default ContentPreviewLogic