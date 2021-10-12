import React, { useState } from 'react'

interface Props{
    list: string[]
}


const MultimediaBottomDataLogic = (props:Props) => {
    const [duration, setDuration] = useState<null | string>(null)
    const [episodes, setEpisodes] = useState<null | string>(null)
    const [seasons, setSeasons] = useState<null | string>(null)
    const [date, setDate] = useState<null | string>(null)
    
    setDuration(props.list[0])
    setEpisodes(props.list[1])
    setSeasons(props.list[2])
    setDate(props.list[3])
    return { duration, episodes, seasons, date}
}

export default MultimediaBottomDataLogic

