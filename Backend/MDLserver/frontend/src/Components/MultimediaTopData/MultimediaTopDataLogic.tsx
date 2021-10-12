import React, { useState } from 'react'

interface TopData {
    list: string[] | null;
}


const MultimediaTopDataLogic = (props:TopData) => {
    const [title , setTitle] = useState<null | string>(null)
    const [type , setType] = useState<null | string>(null)
    const [year , setYear] = useState<null | string>(null)
    const [genre , setGenre] = useState<null | string>(null)
    const [color , setColor] = useState<null | string>(null)
    setTitle(props != null ? props.list != null ? props.list[0] : 'Título' : 'Título' )
    setType(props != null ? props.list != null ? props.list[1] : 'Tipo' : 'Tipo')
    setYear(props != null ? props.list != null ? props.list[2] : '2000' : '2000')
    setGenre(props != null ? props.list != null ? props.list[3] : 'Comedia' : 'Comedia')
    setColor(props != null ? props.list != null ? props.list[4] : 'Red' : 'Red')
    return { title, type, year, genre, color}
}

export default MultimediaTopDataLogic

