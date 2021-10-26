import {useState} from 'react'
import { History } from 'history';

const RegisterLogic = (history: History) => {
    const [pic, setPic] = useState<undefined | string>(undefined)
    const [username, setUsername] = useState('' )
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

        if(password !== confirmPassword){
            setPassword('')
            setConfirmPassword('')
            setTimeout(() => {setError('')}, 5000)
            return setError('Passwords do not match')
        }
        fetch('http://localhost:8000/api/auth/register', {
            method: "POST",
            body: JSON.stringify({username, email, password}),
            headers: {'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(json => {localStorage.setItem('user_id', json.user_id); history.push('/')})
        .catch(err => {
            setTimeout(() => {setError('')}, 5000)
            console.log(err)
            //setError(err.response.error)
        })
    }

    return {pic, username, email, password, confirmPassword, error, setUsername, setEmail, setPassword, setConfirmPassword, registerHandler, updatePic}
}

export default RegisterLogic