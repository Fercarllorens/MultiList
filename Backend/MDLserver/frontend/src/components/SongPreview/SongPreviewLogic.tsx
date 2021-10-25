import React, { useState } from 'react'

const ComponentNameLogic = () => {

    const [json, set_json] = useState()

    // Shows all song's info
    const show_song = (id: string) => {
        console.log("Song clicked")
        fetch_post_song(id)
        fetch_get_track(id)
    }

    const fetch_get_track = async (id: string) => {
        let url = `http://127.0.0.1:8000/spotify/get-track?id=${id}&user=jxl18bdljif6xgk8hgrcfdk3mgsxy0eo`
        fetch(url)
            .then((res) => res.json())
            .then((json) => set_json(json))
            .catch((err) => console.error(err))
    }

    const fetch_post_song = async (id: string) => {
        let url = `http://127.0.0.1:8000/api/post_song?external_id=${id}`
        fetch(url)
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.error(err))
    }

    return {show_song}
}
export default ComponentNameLogic