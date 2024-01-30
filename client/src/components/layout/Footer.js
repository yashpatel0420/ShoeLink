import React from 'react';
import './footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-container">
            <div className="row">
                <div className="footer-col">
                    <h4>company</h4>
                    <ul>
                        <li>about us</li>
                        <li>our services</li>
                        <li>privacy policy</li>
                        <li>affiliate program</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>get help</h4>
                    <ul>
                        <li>FAQ</li>
                        <li>shipping</li>
                        <li>returns</li>
                        <li>order status</li>
                        <li>payment options</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>online shop</h4>
                    <ul>
                        <li>watch</li>
                        <li>bag</li>
                        <li>shoes</li>
                        <li>dress</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>follow us</h4>
                    <div className="social-links">
                    <ul>
                        <li><FacebookIcon/></li>
                        <li><TwitterIcon/></li>
                        <li><InstagramIcon/></li>
                        <li><LinkedInIcon/></li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer