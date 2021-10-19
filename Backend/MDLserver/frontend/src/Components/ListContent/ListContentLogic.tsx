import { useState } from "react"

interface Props{
    contents: JSON | null;
    name: string | null;
}

const ListContentLogic = (props:Props) => {
    let data:JSON = JSON.parse('{ "id1" :"id", "id2":"id", "id3":"id"}');
    
    let contentList: string[] = []
    for( const key in data){
       console.log( key, ":", )
    }
    const [name, setName] = useState<null | string>(props!=null && props.name != null ? props.name : 'Nombre')
    const [list, setList] = useState<null | string[]>([])
    return {}
}




export default ListContentLogic