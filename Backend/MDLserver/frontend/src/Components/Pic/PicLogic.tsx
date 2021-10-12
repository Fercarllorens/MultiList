import { useState } from "react"

interface Props{
    url: string;
}

const PicLogic = (props:Props) => {
    const [pic, setPic] = useState<null | string>(null)
    setPic(props.url)
    return {pic, setPic }
}

export default PicLogic