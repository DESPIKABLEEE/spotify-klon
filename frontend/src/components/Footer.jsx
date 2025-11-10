import './Footer.scss'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left">
        <a href="#">Preview of spotify</a><br />
        <Link className="footer-signup-link" to="/register">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</Link>
      </div>
      <div className="footer-right">
        <Link className="footer-signup-button" to="/register">Sign up for free</Link>
      </div>
    </div>
  )
}

export default Footer