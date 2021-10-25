import React, { useState } from 'react'

const ComponentNameLogic = () => {

    // Shows all song's info
    const show_song = (id: string) => {
        console.log("Song clicked")
        // ir a /MultimediaContent?id=id&type=song
    }

    return {show_song}
}
export default ComponentNameLogic