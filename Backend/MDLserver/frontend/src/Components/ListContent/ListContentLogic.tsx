import { useState } from "react"

interface Props{
    id: string;
    type: string;
}

interface List{
    id: string;
    name: string;
    type: string;
    contents : string[];
    user_id : string; 
}

interface Song{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    album: any;
}

const ListContentLogic = (props:Props) => {
    const [data , setData] = useState<null | List>(null)
    let id : string | null = props.id
    
    let url : string = `http://localhost:8000/api/get-list?id=${id}`
    
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
    const [contents , setContents] = useState<string[]>(data !=null ? data.contents : [""])

   
    return {contents}
}




export default ListContentLogic