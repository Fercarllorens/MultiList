import React from 'react'
import { useHistory } from 'react-router'

const ComponentNameLogic = () => {

    let history = useHistory()

    // Shows all song's info
    const show_series = (id: string) => {
        const user_id : string | null = localStorage.getItem('user_id') 
        const base_url = 'http://127.0.0.1:8000/'

        history.push({
            pathname:'/MultimediaContent',
            search: `?type=series&id=${id}`
         })

    }

    return {show_series}
}
export default ComponentNameLogic