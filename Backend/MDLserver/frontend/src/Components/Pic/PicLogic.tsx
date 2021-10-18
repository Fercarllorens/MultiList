import { useState } from "react"

interface Props{
    url: string | null;
}

const PicLogic = (props:Props) => {
    const [pic, setPic] = useState<null | string>(props != null ? props.url: 'no disponible')
    return {pic}
}

export default PicLogic