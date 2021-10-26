import { useState } from "react";

interface User{
    username: string;
    password: string;
    email: string;
    created_at: string;
    spotify_token: string;
    lists: string[];
}

const MyListsLogic = () => {
    const [data , setData] = useState<null | User>(null)
    let userId : string | null = localStorage.getItem('user_id')
    let url : string = `http://localhost:8000/api/get-user?user_id=${userId}`
    function getData ()
    {
        fetch(url)
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => console.error(err))
        console.log(data)
    }
    return{data, setData, getData}
}



export default MyListsLogic