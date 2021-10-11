import React, { useState } from 'react'
interface Props {
    trailer: string;
}

// trailer es string, pasamos la url para usarla como source
const MultimediaBottomDataLogic = (props:Props) => {
    let trailer:string = props.trailer;
    return {trailer}
}

export default MultimediaBottomDataLogic