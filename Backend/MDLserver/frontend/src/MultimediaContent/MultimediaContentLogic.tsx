import React, { useState } from 'react'

interface Props {
    data : JSON;
}

// trailer es string, pasamos la url para usarla como source
const MultimediaContentLogic = (props:Props) => {
    let data: JSON = props.data;
    let trailer_url: string = 'placeholder'
    let list_top: string[] = ['placeholder']
    let list_bottom: string[] = ['placeholder']
    return {list_top, trailer_url, list_bottom}
}

export default MultimediaContentLogic