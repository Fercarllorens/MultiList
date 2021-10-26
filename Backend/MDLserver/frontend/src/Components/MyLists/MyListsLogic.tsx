import { useState } from "react";

interface User{
    id: string
    username: string;
    password: string;
    email: string;
    created_at: string;
    spotify_token: string;
    lists: string;
}

const MyListsLogic = () => {
    
    let userId : string | null = localStorage.getItem('user_id')
    const [data, setData] = useState<null | User>(null)
    let url : string = `http://localhost:8000/api/get-user?user_id=${userId}`

    function getData ()
    {
        fetch(url)
        .then((res) => { return res? res.json() : res})
        .then((json) => { if(json) setData(json)})
        .catch((err) => console.error(err))
    }
    
    function getList (){
        let datos = data != null ? data.lists : "a"
        let datArray: any[] = JSON.parse(datos)
        return datArray
    }

    return{data, setData, getData, getList}
}



export default MyListsLogic