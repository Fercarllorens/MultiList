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

const ListContentLogic = () => {
    const [data , setData] = useState<null | JSON[]>(null)
    
    let url : string = `http://localhost:8000/api/get-list?id=1`
    
    function getData ()
    {
        let base_url = "http://localhost:8000/api/"
        fetch(url)
        .then((res) => { return res? res.json() : res})
        .then((json) => { if(json){
            let item_list = [1]
            let item_contents: JSON[] = []
            if (json.type == "song") {
                item_contents = getItemsByList(item_list, base_url+"get-song?id=")
            }
            if (json.type == "film"){
                item_contents = getItemsByList(item_list, base_url+"get-film?id=")
            }
            if (json.type == "serie"){
                item_contents = getItemsByList(item_list, base_url+"get-serie?id=")
            }
            setData(item_contents)
        }})
        .catch((err) => console.error(err))
    }

    function getItemsByList(item_list: number[], url: string){
        let item_contents: JSON[] = []
        item_list.forEach(item => {
            fetch(url+item.toString())
                .then((res) => { return res? res.json() : res})
                .then((json) => {item_contents.push(json)})
        })
        return item_contents
    }
   
    return {data, setData, getData}
}




export default ListContentLogic