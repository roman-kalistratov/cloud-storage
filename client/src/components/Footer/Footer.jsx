import React from 'react';
import { Link } from 'react-router-dom';
import footerLogo from '../../assets/img/logo_footer.png'
import './footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      Designed & Built by Roman Kalistratov
      <Link to="/" className="footer__link">
        <img className='footer__logo' src={footerLogo} alt="logo-rk" />
      </Link>
    </footer>
  )
}

export default Footer