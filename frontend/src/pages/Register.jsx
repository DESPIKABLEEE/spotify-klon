import './Register.scss'
import { SpotifyLogo } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='register-wrapper'>
      <div className='register-container'>
        <SpotifyLogo className='register-logo' size={64} weight='fill' />
        <h1 className='register-title'>Sign up to start listening</h1>
        <form className='register-form' onSubmit={(event) => event.preventDefault()}>
          <label className='register-label' htmlFor='register-email'>Email address</label>
          <input className='register-input' type='email' id='register-email' name='email' placeholder='name@domain.com' required />
          <label className='register-label' htmlFor='register-password'>Password</label>
          <input className='register-input' type='password' id='register-password' name='password' placeholder='Create a password' required />
          <button className='register-submit' type='submit'>Next</button>
        </form>
        <div className='register-divider'><span>or</span></div>
        <div className='register-providers'>
          <button className='register-provider' type='button'>GOOGLE</button>
        </div>
        <div className='register-footer'>
          <span>Already have an account?</span>
          <Link to='/login'>Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
