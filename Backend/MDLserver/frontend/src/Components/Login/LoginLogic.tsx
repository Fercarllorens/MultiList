import {useState} from 'react'
import { History } from 'history';

const LoginLogic = (history: History) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch('http://localhost:8000/api/login', {
            method: "POST", 
            body: JSON.stringify({email, password}), 
            headers: {'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(json => {localStorage.setItem('user_id', json.user_id); window.location.href = '/'})
        .catch(err => {
            setTimeout(() => {setError('')}, 5000)
            //setError(err)
        })
    }

    return {email, password, error, setEmail, setPassword, loginHandler}
}

export default LoginLogic