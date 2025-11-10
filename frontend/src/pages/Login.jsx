import './Login.scss'
import { SpotifyLogo } from '@phosphor-icons/react'
const Login = () => {
  return (
    <>
    <div className='login-wrapper'>
        <div className='login-container'>
            <SpotifyLogo className='login-logo' size={64} weight='fill' />
            <h1 className='login-title'>Sign up to start listening</h1>
            <form className='login-form' onSubmit={(event) => event.preventDefault()}>
                <label className='login-label' htmlFor='login-email'>Email address</label>
                <input className='login-input' type='email' id='login-email' name='email' placeholder='name@domain.com' required />
                <button className='login-submit' type='submit'>Next</button>
            </form>
            <div className='login-divider'><span>or</span></div>
            <div className='login-providers'>
                <button className='login-provider' type='button'>GOOGLE</button>
            </div>
            <div className='login-footer'>
                <span>Already have an account?</span>
                <a href='#'>Log in</a>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login