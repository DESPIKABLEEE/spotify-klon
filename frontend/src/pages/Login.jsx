import './Login.scss'
import { SpotifyLogo } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <SpotifyLogo className='login-logo' size={60} weight='fill' />
        <h1 className='login-title'>Welcome back</h1>
        <form className='login-form' onSubmit={(event) => event.preventDefault()}>
          <label className='login-label' htmlFor='login-identifier'>Email address or username</label>
          <input className='login-input' type='text' id='login-identifier' name='identifier' placeholder='name@domain.com' required />
          <label className='login-label' htmlFor='login-password'>Password</label>
          <input className='login-input' type='password' id='login-password' name='password' placeholder='Password' required />
          <a className='login-forgot' href='#'>Forgot your password?</a>
          <button className='login-submit' type='submit'>Log in</button>
        </form>
        <div className='login-divider'><span>or</span></div>
        <div className='login-providers'>
          <button className='login-provider' type='button'>GOOGLE</button>
        </div>
        <div className='login-footer'>
          <span>Dont have an account?</span>
          <Link to='/register'>Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login