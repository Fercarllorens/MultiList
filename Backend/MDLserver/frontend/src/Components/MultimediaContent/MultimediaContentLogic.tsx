import React, { useState } from 'react'

interface Props {
    data : JSON | null;
}

// trailer es string, pasamos la url para usarla como source
const MultimediaContentLogic = (props:Props) => {
    
    const [data, setData] = useState<null | JSON>(null)
    setData (props.data)

    let placeholder: string[] = ['placeholder', '', '', '', '']
    const [ imageUrl, setImageUrl] = useState<null | string>(null)
    const [ trailerUrl , setTrailerUrl] = useState<null | string>(null)
    const [ listTop , setListTop] = useState<null | string[]>(null)
    const [ listBottom , setListBottom] = useState<null | string[]>(null)
    setImageUrl(placeholder[0])
    setTrailerUrl(placeholder[0])
    setListBottom(placeholder)
    setListTop(placeholder)
    
    return {listTop, imageUrl, trailerUrl, listBottom}
}

export default MultimediaContentLogic