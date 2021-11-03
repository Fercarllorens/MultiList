import React from 'react'
import { useHistory } from 'react-router'

const FilmPreviewLogic = () => {

    let history = useHistory()

    // Shows all film's info
    const show_film = (id: string) => {
        const user_id : string | null = localStorage.getItem('user_id') 
        const base_url = 'http://127.0.0.1:8000/'

        history.push({
            pathname:'/MultimediaContent',
            search: `?type=film&id=${id}`
         })
    }

    return {show_film}
}
export default FilmPreviewLogic