import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          
          <div className="footer-brand-col">
            <h2 className="footer-logo">StayScape</h2>
            <p className="footer-tagline">
              Discover and book your next unforgettable stay in seconds.
            </p>
          </div>

          <div className="footer-links-col">
            <h3 className="footer-col-title">Company</h3>
            <ul className="footer-links-list">
              <li><Link to="/about">About</Link></li>
              <li><span className="footer-link-disabled">Careers</span></li>
              <li><span className="footer-link-disabled">Blog</span></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h3 className="footer-col-title">Support</h3>
            <ul className="footer-links-list">
              <li><span className="footer-link-disabled">Help Center</span></li>
              <li><span className="footer-link-disabled">Contact Us</span></li>
              <li><span className="footer-link-disabled">Safety</span></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h3 className="footer-col-title">Legal</h3>
            <ul className="footer-links-list">
              <li><span className="footer-link-disabled">Terms of Service</span></li>
              <li><span className="footer-link-disabled">Privacy Policy</span></li>
            </ul>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom-row">
          <p className="footer-copyright">&copy; 2026 StayScape. All rights reserved.</p>
          <div className="footer-locale-settings">
            <span className="locale-item">English (US)</span>
            <span className="locale-item currency-item">$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
