import React, {useEffect} from 'react'
import { useLocation } from 'react-router';

const Spotify: React.FC = () => {
    const {search} = useLocation()

    useEffect(() => {
        const query = new URLSearchParams(search)
        const sptk_id = query.get('sptk')
        const uid = localStorage.getItem('user_id')
        console.log(sptk_id)
        console.log(uid)

        fetch('http://localhost:8000/spotify/link-user', {
            method: "POST", 
            body: JSON.stringify({sptk: sptk_id, user_id: uid}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res=> {return res? res.json() : res})
            .then(json=> {
                console.log(json)
                if (json.error===undefined) { window.location.href = 'http://localhost:3000/Profile'}
                else { alert(json.error) }
            })
            .catch(err=> {console.error(err)})
    }, [search])

    return (
        <div>
            <h1>AAAAAA</h1>
        </div>
    )
}

export default Spotify