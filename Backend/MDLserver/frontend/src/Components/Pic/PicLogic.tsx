import { useState } from "react"

const PicLogic = (props) => {
    const [pic, setPic] = useState<null | string>(null)

    return {pic, setPic }
}

export default PicLogic