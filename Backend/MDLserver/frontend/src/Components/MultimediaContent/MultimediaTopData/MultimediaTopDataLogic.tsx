import React, { useState } from 'react'

interface TopData {
    list: string[] | null;
}


const MultimediaTopDataLogic = (props:TopData) => {
    const [title , setTitle] = useState<null | string>(props != null && props.list != null ? props.list[0]: 'no disponible')
    const [type , setType] = useState<null | string>(props != null && props.list != null ? props.list[1]: 'no disponible')
    const [year , setYear] = useState<null | string>(props != null && props.list != null ? props.list[2]: 'no disponible')
    const [genre , setGenre] = useState<null | string>(props != null && props.list != null ? props.list[3]: 'no disponible')
    const [color , setColor] = useState<null | string>(props != null && props.list != null ? props.list[4]: 'no disponible')
    return { title, type, year, genre, color}
}

export default MultimediaTopDataLogic

