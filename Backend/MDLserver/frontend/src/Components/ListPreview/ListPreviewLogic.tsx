import { useState } from "react";
import { useHistory } from 'react-router'

interface Props{
    id: string;
}

interface List{
    id: number
    name: string
    type: string
    contents: string[]
    user_id: string
}

const ListPreviewLogic = (props:Props) => {
    const [data , setData] = useState<null | List>(null)
    let id : string | null = props.id
    let url : string = `http://localhost:8000/api/get-list?id=${id}`
    const history = useHistory()
    const user_id : string | null = localStorage.getItem('user_id') 
    function getData ()
    {
        fetch(url)
        .then((res) => { return res? res.json() : res})
        .then((json) => { if(json) setData(json)})
        .catch((err) => console.error(err))
    }
    let list = data != null ? data: null;
    console.log(list)
    const show_list = (id: number) => {  
        history.push({
            pathname:'/List',
            search: `?id=${id}`
         })

    }

    return{list, getData, show_list}
}

export default ListPreviewLogic