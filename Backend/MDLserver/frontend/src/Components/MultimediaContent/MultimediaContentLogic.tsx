import React, { useState } from 'react'

interface Props {
    data : JSON | null;
}

// trailer es string, pasamos la url para usarla como source
const MultimediaContentLogic = (props:Props) => {
    
    /*const [data, setData] = useState<null | JSON>(null)
    if(props.data == null){ setData (JSON.parse("{}")) }
    else {setData (props.data)}*/

    let placeholder: string[] = ['placeholder', '', '', '', '']
    const [ imageUrl, setImageUrl] = useState<null | string>('no disponible')
    const [ trailerUrl , setTrailerUrl] = useState<null | string>('no disponible')
    const [ listTop , setListTop] = useState<null | string[]>(['no disponible'])
    const [ listBottom , setListBottom] = useState<null | string[]>(['no disponible'])
    //setImageUrl(placeholder[0])
    //setTrailerUrl(placeholder[0])
    //setListBottom(placeholder)
    //setListTop(placeholder)
    
    return {listTop, imageUrl, trailerUrl, listBottom}
}

export default MultimediaContentLogic