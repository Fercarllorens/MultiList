import { useState } from "react";
import { useLocation } from 'react-router';
import { fetchHandlerCb } from "../fetchHandler";


const CastingLogic = () => {

    const {search} = useLocation()
    const query = new URLSearchParams(search)
    const name_query: any = query.get('name')
    const id_query: any = query.get('id')
    const type_query: any = query.get('type')
    const img_query: any = query.get('img')
    const [ listCasting , setListCasting] =   useState<any[]>([])
    function get_casting(){
        if(type_query == 'film'){
            fetchHandlerCb(`video/get-film-credits?id=${id_query}`, 'GET', null, set_casting)
        } else if(type_query == 'series'){
            fetchHandlerCb(`video/get-show-credits?id=${id_query}`, 'GET', null, set_casting)
        }
        
    }

    function set_casting(json: any){
        let objList: any[] = []
        json.cast.forEach((element: any) => {
            let obj = {
                name: element.name,
                character: element.character
            }
            objList.push(obj)
        });
        setListCasting(objList)
    }
    return{name_query, get_casting, img_query, listCasting}
}



export default CastingLogic