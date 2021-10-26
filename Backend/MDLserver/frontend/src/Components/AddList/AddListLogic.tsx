import { type, userInfo } from "os"
import { FormEventHandler, useState } from "react"

interface Props{
    contentId: string;
    type: string;
}

// const AddListLogic = (props:Props) => {
//     const [data , setData] = useState<null | JSON>(null)
//     let userId : string | null = localStorage.getItem('user_id')
//     let type : string | null = props.type
//     let contentId : string | null = props.contentId;
//     let url : string = `http://localhost:8000/api/update-list?id=${userId}&contentId=${contentId}&type=${type}`
    
//     fetch(url)
//      .then((res) => { return res? res.json() : res})
//      .then((json) => { if(json) setData(json)})
//      .catch((err) => console.error(err))
    
// }

//export default AddListLogic