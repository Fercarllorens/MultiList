import React, {useEffect} from 'react'
import { Link, RouteComponentProps } from "react-router-dom";
import RegisterLogic from './RegisterLogic'
import './Register.css'

const Register: React.FC<RouteComponentProps> = ({history}) => {
    const {pic, name, email, password, confirmPassword, error, setName, setEmail, setPassword, setConfirmPassword, registerHandler, updatePic} = RegisterLogic(history)

    useEffect(() => {
        if(localStorage.getItem('authToken')) history.push('/')
    }, [history])

    return (
        <div className='register-screen'>
            <form className='register-screen__form' onSubmit={registerHandler}>
                <h3 className='register-screen__title'>Register</h3>
                {error&& <span className='error-message'>{error}</span>}
                <div className='form-group'>
                    <label htmlFor='name'>Username: </label>
                    <input type='text' required id='name' placeholder='username' value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' required id='email' placeholder='email@email.com' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' required id='password' placeholder='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password: </label>
                    <input type='password' required id='confirmPassword' placeholder='confirmPassword' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </div>
            
                <div className='pic-group'>
                    <img src={pic} alt="Selected user image" />
                    <label htmlFor='Pic'>Select Picture (optional): </label>
                    <input type='file'  accept=".jpg, .png, .jpeg" required id='Pic' onChange={updatePic}/>
                </div>
            
                <div className='form-group register-form-group'>
                    <input type='submit' className='form-btn' value='Register'/>
                </div>
                
                <div className='form-group'>
                    <span className='register-screen__subtext'>Already have an account? <Link to='/login'>Login here!</Link></span>
                </div>

            </form>
        </div>
    )
}

export default Register