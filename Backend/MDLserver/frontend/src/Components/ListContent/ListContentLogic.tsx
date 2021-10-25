import { useState } from "react"

interface Props{
    contents: JSON | null;
    name: string | null;
}

interface Data{
    items: string[];
}

const ListContentLogic = (props:Props) => {
    let data:Data = JSON.parse(props.contents != null ? props.contents : JSON.parse('{"items": [""]}'));
    
    let contentList: string[] = []
    for( let i = 0, comp; i < data.items.length; i++){
       comp = data.items[i];
       contentList.push(comp)
    }
    console.log(contentList)
    const [name, setName] = useState<null | string>(props!=null && props.name != null ? props.name : 'Nombre')
    const [list, setList] = useState<null | string[]>([])
    return {}
}




export default ListContentLogic