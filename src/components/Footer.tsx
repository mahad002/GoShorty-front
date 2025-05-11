import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightCircle as CircleArrowRight } from 'lucide-react';
import paymentMethodsIcon from '../assets/payment-methods.svg';
import logoDark from '../assets/logo_main_dark.png';

const Footer: React.FC = () => {
  return (
    <div className="footer-main-section">
      <div className="footer-inner-section">
        <div className="footer-grid">
          <div className="footer-left-column">
            <Link to="/" className="block">
              <img
                src={logoDark}
                alt="Dark version of GoShorty logo" 
                className="footer-logo-image"
              />
            </Link>
            <Link
              to="/quote"
              className="base-button button-style-primary base-button-set-width base-button-small-text"
            >
              <div>Get a Quote <CircleArrowRight className="inline-block ml-2 w-5 h-5" /></div>
            </Link>
          </div>

          <div className="footer-right-column">
            <div className="base-divider" />
            <div className="footer-sub-content-grid">
              <div className="footer-sub-content-grid-left">
                <div className="footer-links">
                  <a href="https://goshorty.co.uk/privacy-policy/" className="footer-link">Privacy Policy</a>
                  <a href="https://goshorty.co.uk/cookie-policy/" className="footer-link">Cookie Policy</a>
                  <a href="https://goshorty.co.uk/terms-of-business/" className="footer-link">Terms of Business</a>
                  <a href="https://goshorty.co.uk/terms-of-use/" className="footer-link">Terms of Use</a>
                </div>
                <p className="footer-disclaimer-text">
                  We are a UK based insurance broker and we are authorised and regulated by the Financial Conduct Authority under reference number 751221.
                </p>
                <p className="footer-disclaimer-text">
                  GoShorty is a registered trademark. GoShorty is a trading style of Complex to Clear Group Limited registered in England and Wales.
                </p>
                <p className="footer-disclaimer-text">
                  Company Registration Number 05044963. Data Protection Registration ZA456686.
                </p>
              </div>

              <div className="footer-sub-content-grid-right">
                <img
                  src={paymentMethodsIcon}
                  alt="Payment methods image"
                  className="footer-payment-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;