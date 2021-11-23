import { useState } from "react"
import { useLocation } from 'react-router';

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

interface Content{
    name: string
    external_id : string
    total_rating: number
    comments: any
    type: string
}

interface Song{
    name: string;
    authors: string;
    date: string;
    img: string;
    preview_url: string;
    album: any;
}

const ListContentLogic = () => {
    const baseurl : string = `http://localhost:8000/api/`
    const user_id : string | null = localStorage.getItem('user_id')
    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const id_query: any = query.get('id')
    const [list, setList] = useState<null |string[]>(null)
    const [data, setData]  = useState<null |Content[]>(null)
    
    
    function getData ()
    {
        let url = baseurl + `get-list?id=${id_query}`
        fetch(url)
        .then((res) => { return res? res.json() : res})
        .then((json) => { if(json){
            console.log(JSON.parse(json.contents)["items"])
            let item_contents: string[] = JSON.parse(json.contents)["items"]
            const body = JSON.stringify({list: item_contents})
            fetch(baseurl + `get-content-array` , {method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
              .then((res) => {return res? res.json() : res})
              .then((json) => {
                if(json != "[]"){
                    console.log(JSON.parse(json)[0].name)

                 setData(JSON.parse(json))
                }
              })
              
        }})
        .catch((err) => console.error(err))
    }

    // function getItemsByList(item_list: string[]){
    //     let url = baseurl + `get-content?id=`
    //     let item_contents: Content[] = []
    //     let item_names : string[] = []
    //     item_list.forEach(item => {
    //         fetch(url+item.toString())
    //             .then((res) => { return res? res.json() : res})
    //             .then((json) => {
    //                 console.log(json)
    //                 item_names.push(json.name)
    //             })
    //     })
    //     console.log (item_names)
    //     return item_names
    // }
   
    return {data, list, getData}
}




export default ListContentLogic