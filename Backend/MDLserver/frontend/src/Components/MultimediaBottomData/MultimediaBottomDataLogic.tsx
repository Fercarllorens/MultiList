import React, { useState } from 'react'

interface Props{
    list: string[] | null
}


const MultimediaBottomDataLogic = (props:Props) => {
    const [duration, setDuration] = useState<null | string>(props != null && props.list != null ? props.list[0]: 'no disponible')
    const [episodes, setEpisodes] = useState<null | string>(props != null && props.list != null ? props.list[1]: 'no disponible')
    const [seasons, setSeasons] = useState<null | string>(props != null && props.list != null ? props.list[2]: 'no disponible')
    const [date, setDate] = useState<null | string>(props != null && props.list != null ? props.list[3]: 'no disponible')
    const [album, setAlbum] = useState<null | string>(props != null && props.list != null ? props.list[4]: 'no disponible')
    const [authorOrBand, setAuthorOrBand] = useState<null | string>(props != null && props.list != null ? props.list[5]: 'no disponible')
    return { duration, episodes, seasons, date, album, authorOrBand}
}

export default MultimediaBottomDataLogic

