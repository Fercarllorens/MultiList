import React from 'react'
import { useHistory } from 'react-router-dom'

const VisualContentLogic = () => {

    let history = useHistory()

    const showSheet = (id: string, type: "film" | "series" | "song") => {        
        history.push({
            pathname:'/MultimediaContent',
            search: `?type=${type}&id=${id}`
         })
    }

    return { showSheet }
}
export default VisualContentLogic