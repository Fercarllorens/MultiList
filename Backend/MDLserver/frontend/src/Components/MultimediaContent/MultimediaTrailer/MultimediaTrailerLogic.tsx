import React, { useState } from 'react'
interface Props {
    trailer: string | null;
}

// trailer es string, pasamos la url para usarla como source
const MultimediaBottomDataLogic = (props:Props) => {
    const [trailer, setTrailer] = useState<null | string>(props != null ? props.trailer : 'no disponible')
   
    return {trailer}
}

export default MultimediaBottomDataLogic