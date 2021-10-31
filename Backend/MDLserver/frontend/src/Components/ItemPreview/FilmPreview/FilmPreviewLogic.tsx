import React from 'react'
import { useHistory } from 'react-router'

const FilmPreviewLogic = () => {

    let history = useHistory()

    // Shows all film's info
    const show_film = (id: string) => {
        history.push({
            pathname:'/MultimediaContent',
            search: `?type=film&id=${id}`
         })
    }

    return {show_film}
}
export default FilmPreviewLogic