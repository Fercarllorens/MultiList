import React from 'react'
import { useHistory } from 'react-router'

const ComponentNameLogic = () => {

    let history = useHistory()

    // Shows all song's info
    const show_series = (id: string) => {
        history.push({
            pathname:'/MultimediaContent',
            search: `?type=series&id=${id}`
         })

    }

    return {show_series}
}
export default ComponentNameLogic