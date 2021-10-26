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
            <form className='login-screen__form' onSubmit={loginHandler}>
                <h3 className='login-screen__title'>Login</h3>
                {error&& <span className='error-message'>{error}</span>}
                <div className='form-group'>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' required id='email' placeholder='email@email.com' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' required id='password' placeholder='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <div className='form-group'>
                    <input type='submit' className='form-btn' value='Login'/>
                </div>

                <div className='form-group'>
                    <span className='login-screen__subtext'>Don't have an account? <Link to='/register'>Register here!</Link></span>
                </div>

                <div className='form-group'>
                    <span className='login-screen__subtext'>Forgot your password? <Link to='/forgotpassword'>Click here!</Link></span>
                </div>

           </form>
        </div>
    )
}

export default Login