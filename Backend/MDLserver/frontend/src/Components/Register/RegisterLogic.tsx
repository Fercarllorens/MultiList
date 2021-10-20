import {useState} from 'react'
import { History } from 'history';
import axios from 'axios'

const RegisterLogic = (history: History) => {
    const [pic, setPic] = useState<undefined | string>(undefined)
    const [name, setName] = useState('' )
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const updatePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        // let reader = new FileReader();
        // reader.onloadend = () => {
        //   // use a regex to remove data url part
        //     const base64String = reader.result
        //     .replace("data:", "")
        //     .replace(/^.+,/, "");

        //   // log to console
        //   // logs wL2dvYWwgbW9yZ...
        //   setFts(base64String);
        // };
        if (e.target.files == null) {setError('Please select an image file'); return}
        var file: File = e.target.files[0]
        setPic(URL.createObjectURL(file));
        //reader.readAsDataURL(file);
    }

    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const config: any = {
            header: {
                'Content-Type' : 'application/json'
            }
        }

        if(password !== confirmPassword){
            setPassword('')
            setConfirmPassword('')
            setTimeout(() => {setError('')}, 5000)
            return setError('Passwords do not match')
        }

        try {
            const { data }: any = await axios.post('/api/auth/register', {username: name, email, password}, config)
            localStorage.setItem('authToken', data.token)
            localStorage.setItem('user_id', data.user._id)
            history.push('/')
        } catch (err: any) {
            setTimeout(() => {setError('')}, 5000)
            setError(err.response.data.error)
        }
    }

    return {pic, name, email, password, confirmPassword, error, setName, setEmail, setPassword, setConfirmPassword, registerHandler, updatePic}
}

export default RegisterLogic