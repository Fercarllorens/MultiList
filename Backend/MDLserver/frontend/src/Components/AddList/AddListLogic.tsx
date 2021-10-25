import { userInfo } from "os"
import { useState } from "react"



const AddListLogic: any = () => {
    const [data , setData] = useState<null | JSON>(null)
    let userId : string | null = localStorage.getItem('user_id')
    let contentId : string | null = "";
    let url : string = `http://localhost:8000/api/update-list?id=${userId}&contentId=${contentId}`
    
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err))
}




export default AddListLogic