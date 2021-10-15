import React, { useState } from 'react'

interface Props{
    list: string[] | null
}


const MultimediaBottomDataLogic = (props:Props) => {
    const [duration, setDuration] = useState<null | string>('no disponible')
    const [episodes, setEpisodes] = useState<null | string>('no disponible')
    const [seasons, setSeasons] = useState<null | string>('no disponible')
    const [date, setDate] = useState<null | string>('no disponible')
    
    setDuration(props != null ? props.list != null ? props.list[0] : '2H' : '2H')
    setEpisodes(props != null ? props.list != null ? props.list[0] : '1' : '1')
    setSeasons(props != null ? props.list != null ? props.list[0] : '1' : '1')
    setDate(props != null ? props.list != null ? props.list[0] : '01/01/2000' : '01/01/2000')
    return { duration, episodes, seasons, date}
}

export default MultimediaBottomDataLogic

