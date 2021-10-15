import { useState } from "react"

interface Props{
    url: string | null;
}

const PicLogic = (props:Props) => {
    const [pic, setPic] = useState<null | string>('no disponible')
    setPic(props.url)
    return {pic, setPic }
}

export default PicLogic