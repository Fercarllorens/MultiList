import { useState } from "react"

interface Props{
    contents: JSON | null;
    name: string | null;
}

interface Items{
    id : string;
}

interface Data{
    items: Items[];
}

const ListContentLogic = (props:Props) => {
    let data:Data = JSON.parse('{"items":[{"id":"value1"},{"id":"value2"},{"id":"value3"}]}');
    
    let contentList: string[] = []
    for( let i = 0, comp; i < data.items.length; i++){
       comp = data.items[i];
       contentList.push(comp.id)
    }
    console.log(contentList)
    const [name, setName] = useState<null | string>(props!=null && props.name != null ? props.name : 'Nombre')
    const [list, setList] = useState<null | string[]>([])
    return {}
}




export default ListContentLogic