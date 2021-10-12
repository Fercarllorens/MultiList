import React, { useState } from 'react'

interface TopData {
    list: string[];
}


const MultimediaTopDataLogic = (props:TopData) => {
    const [title , setTitle] = useState<null | string>(null)
    const [type , setType] = useState<null | string>(null)
    const [year , setYear] = useState<null | string>(null)
    const [genre , setGenre] = useState<null | string>(null)
    const [color , setColor] = useState<null | string>(null)
    setTitle(props.list[0])
    setType(props.list[1])
    setYear(props.list[2])
    setGenre(props.list[3])
    setColor(props.list[4])
    return { title, type, year, genre, color}
}

export default MultimediaTopDataLogic

