import React, { useState } from 'react'

interface Props {
    data : JSON | null;
}

// trailer es string, pasamos la url para usarla como source
const MultimediaContentLogic = (props:Props) => {
    
    
    const [ imageUrl, setImageUrl] = useState<null | string>('no disponible')
    const [ trailerUrl , setTrailerUrl] = useState<null | string>('no disponible')
    const [ listTop , setListTop] = useState<null | string[]>(['no disponible'])
    const [ listBottom , setListBottom] = useState<null | string[]>(['no disponible'])
    
    
    return {listTop, imageUrl, trailerUrl, listBottom}
}

export default MultimediaContentLogic