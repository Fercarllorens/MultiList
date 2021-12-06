import React, {useEffect} from 'react'
import { Link, RouteComponentProps } from "react-router-dom";
import RegisterLogic from './RegisterLogic'
import './Register.css'

const Register: React.FC<RouteComponentProps> = ({history}) => {
    const {pic, username, email, password, confirmPassword, error, setUsername, setEmail, setPassword, setConfirmPassword, registerHandler, updatePic} = RegisterLogic(history)
    const defaultUserPic = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fbig%2F157-1578186_user-profile-default-image-png-clipart.png&f=1&nofb=1'

    useEffect(() => {
        if(localStorage.getItem('authToken')) history.push('/')
    }, [history])

    return (
        <div className='register-screen'>
            <div className='register-screen_bg-image'></div>
            <form className='register-screen__form' onSubmit={registerHandler}>
                <h3 className='register-screen__title'>Register on Multilist</h3>
                {error&& <span className='error-message'>{error}</span>}
                <input type='text' required id='name' placeholder='Username' value={username} className='form-text-input'
                    onChange={(e) => {setUsername(e.target.value)}}/>

                <input type='email' required id='email' placeholder='Email' value={email} className='form-text-input'
                    onChange={(e) => {setEmail(e.target.value)}}/>

                <input type='password' required id='password' placeholder='Password' value={password} className='form-text-input'
                    onChange={(e) => {setPassword(e.target.value)}}/>

                <input type='password' required id='confirmPassword' placeholder='Confirm Password' value={confirmPassword} className='form-text-input'
                    onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                <span className='register-screen__subtext'>Already have an account? <Link to='/login'>Login here!</Link></span>
                <div className='pic-group'>
                    <img src={pic? pic : defaultUserPic} alt="Selected user image" />
                    <input type='file'  accept=".jpg, .png, .jpeg" id='Pic' className="form-file-input"
                    onChange={updatePic}/>
                </div>
                <input type='submit' className='form-btn' value='Register'/>
            </form>
        </div>
    )
}

export default Register