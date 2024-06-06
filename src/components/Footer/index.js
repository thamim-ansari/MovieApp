import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <ul className="footer-icons-list">
      <li className="footer-items">
        <FaGoogle className="footer-icons" />
      </li>
      <li className="footer-items">
        <FaTwitter className="footer-icons" />
      </li>
      <li className="footer-items">
        <FaInstagram className="footer-icons" />
      </li>
      <li className="footer-items">
        <FaYoutube className="footer-icons" />
      </li>
    </ul>
    <p className="footer-heading">Contact us</p>
  </div>
)

export default Footer
