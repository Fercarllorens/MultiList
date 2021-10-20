import {useState} from 'react'
import { History } from 'history';
import axios from 'axios'

const LoginLogic = (history: History) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const config:any = {
            header: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const {data}:any = await axios.post('/api/auth/login', {email, password}, config)
            console.log(data)
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('user_id', data.user._id)
            history.push('/')
        } catch (err:any) {
            setTimeout(() => {setError('')}, 5000)
            setError(err.response.data.error)
        }
    }

    return {email, password, error, setEmail, setPassword, loginHandler}
}

export default LoginLogic