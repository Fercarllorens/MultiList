import React, { useState } from 'react'
import { useHistory } from 'react-router'

const SongPreviewLogic = () => {
    const user_id : string | null = localStorage.getItem('user_id') 
    const base_url = 'http://127.0.0.1:8000/'
    let history = useHistory()

    // Shows all song's info
    const show_song = (id: string) => {  
        history.push({
            pathname:'/MultimediaContent',
            search: `?type=song&id=${id}`
         })

    }

    return {show_song}
}
export default SongPreviewLogic