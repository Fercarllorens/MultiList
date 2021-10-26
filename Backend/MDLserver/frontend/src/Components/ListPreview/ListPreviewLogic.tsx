import { useState } from "react";

interface Props{
    id: string;
}

interface List{
    name: string
    type: string
    contents: string[]
    user_id: string
}

const ListPreviewLogic = (props:Props) => {
    const [data , setData] = useState<null | List>(null)
    let id : string | null = props.id
    let url : string = `http://localhost:8000/api/get-list?id=${id}`

    function getData ()
    {
        fetch(url)
        .then((res) => { return res? res.json() : res})
        .then((json) => { if(json) setData(json)})
        .catch((err) => console.error(err))
    }
    let list = data != null ? data: null;
    return{list, getData}
}

export default ListPreviewLogic