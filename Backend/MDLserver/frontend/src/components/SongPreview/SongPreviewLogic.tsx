import React, { useState } from 'react'
import { useHistory } from 'react-router'

const ComponentNameLogic = () => {

    let history = useHistory()

    // Shows all song's info
    const show_song = (id: string) => {
        console.log("Song clicked")
        
        history.push({
            pathname:'/MultimediaContent',
            search: `?type=song&id=${id}`
         })

    }

    return {show_song}
}
export default ComponentNameLogic