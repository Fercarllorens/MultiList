import React, { useState } from 'react'

interface Props{
    list: string[] | null
}


const MultimediaBottomDataLogic = (props:Props) => {
    const [duration, setDuration] = useState<null | string>('no disponible')
    const [episodes, setEpisodes] = useState<null | string>('no disponible')
    const [seasons, setSeasons] = useState<null | string>('no disponible')
    const [date, setDate] = useState<null | string>('no disponible')
    
    setDuration(props != null ? props.list != null ? props.list[0] : 'no disponible' : 'no disponible')
    setEpisodes(props != null ? props.list != null ? props.list[0] : 'no disponible' : 'no disponible')
    setSeasons(props != null ? props.list != null ? props.list[0] : 'no disponible' : 'no disponible')
    setDate(props != null ? props.list != null ? props.list[0] : 'no disponible' : 'no disponible')
    return { duration, episodes, seasons, date}
}

export default MultimediaBottomDataLogic

