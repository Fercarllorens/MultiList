import React, {useEffect} from 'react'
import LoginLogic from './LoginLogic'
import { Link, RouteComponentProps } from "react-router-dom";
import './Login.css'

const Login: React.FC<RouteComponentProps> = ({history}) => {
    const {email, password, error, setEmail, setPassword, loginHandler} = LoginLogic(history)

    useEffect(() => {
        if(localStorage.getItem('authToken')) history.push('/')
    }, [history])

    return (
        <div className='login-screen'>
            <div className='login-screen_bg-image'></div>
            <form className='login-screen__form' onSubmit={loginHandler}>
                <h3 className='login-screen__title'>Login to MultiList</h3>
                {error&& <span className='error-message'>{error}</span>}
                <input type='email' required id='email' placeholder='Email' value={email} className='form-text-input'
                onChange={(e) => {setEmail(e.target.value)}}/>

                <input type='password' required id='password' placeholder='Password' value={password} className='form-text-input'
                onChange={(e) => {setPassword(e.target.value)}}/>

                <span className='login-screen__subtext'>Don't have an account? <Link to='/register'>Register here!</Link></span>

                <span className='login-screen__subtext'>Forgot your password? <Link to='/forgotpassword'>Click here!</Link></span>

                <input type='submit' className='form-btn' value='Login'/>

           </form>
        </div>
    )
}

export default Login