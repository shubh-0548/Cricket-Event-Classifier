import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'; // Import Twitter icon
import './footer.css';

const Footer = () => {
  return (
    <footer className="cricket-footer py-4">
      <div className="container text-center">
        <div className="social-icons mt-3">
          <a href="/" className="text-light mx-2">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="/" className="text-light mx-2">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="/" className="text-light mx-2">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a href="/" className="text-light mx-2">
            <FontAwesomeIcon icon={faTwitter} size="2x" className="fa-twitter" />
          </a>
        </div>
        <div className="mt-3">
          <img
          src={require(`../img/io.png`)}
            alt="Cricket Logo"
            className="cricket-logo"
          />
        </div>
        <p className="mt-3 text-light">
          Follow us for the latest updates on cricket!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
