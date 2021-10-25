import { useState } from "react"

interface Props{
    type: string;
}

interface List{
    id: string;
    name: string;
    type: string;
    contents : string[];
    user_id : string; 
}

const ListContentLogic = (props:Props) => {
    const [data , setData] = useState<null | List>(null)
    let userId : string | null = localStorage.getItem('user_id')
    let type : string | null = props.type
    
    let url : string = `http://localhost:8000/api/get-list?id=${userId}&type=${type}`
    
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
    const [contents , setContents] = useState<null | string[]>(data !=null ? data.contents : [""])
    return {contents}
}




export default ListContentLogic