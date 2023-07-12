import React from 'react';
import Button from './Button';
import '../style/Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { Link } from 'react-router-dom';

// TODO: set up email notification and backend to keep track of subscribed user's contact information.
// TODO: add terms of service page
// TODO: add testimonials page
// TODO: fix code - ensure the links scroll to the top when opening a new page

function Footer() {
  return (
    <div
        className='footer-container'
    >
      <section className="footer-sub">
        <p
            className='footer-sub-header'
        >
            Join the Hike newsletter to receive incredible destinations curated for you by our amazing team!
        </p>
        <p
            className='footer-sub-text'
        >
            You can unsubscribe at any time.
        </p>
        <div
            className='sub-input-form'
        >
            <form>
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    className='sub-input'
                />
                <Button
                    btnStyle='btn-outline'
                >
                    Subscribe
                </ Button>
            </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-links-wrapper">
            <div className='footer-link-item'>
                <h2 className='footer-link-header'>About Us</h2>   
                <Link to='/Hike-App/about'>How We Work</Link>
                <Link to='/Hike-App/testimonials'>Testimonials</Link> 
                <Link to='/Hike-App/services'>Our Services</Link> 
                <Link to='/Hike-App/terms'>Terms of Service</Link>
                <Link to='/Hike-App/about'>Giving Back</Link>  
            </div>
            <div className='footer-link-item'>
                <h2 className='footer-link-header'>Contact Us</h2>   
                <Link to='/Hike-App'>Contact</Link> 
                <Link to='/Hike-App'>Support</Link> 
                <Link to='/Hike-App'>Destinations</Link>
                <Link to='/Hike-App'>Timezones</Link>
                <Link to='/Hike-App'>Maps</Link>
            </div>
        </div>
        <div className="footer-links-wrapper">
            <div className='footer-link-item'>
                <h2 className='footer-link-header'>Content</h2>   
                <Link to='/Hike-App'>Featured Brands</Link> 
                <Link to='/Hike-App'>Submit Your Video</Link> 
                <Link to='/Hike-App'>Brand Ambassadors</Link> 
                <Link to='/Hike-App'>Sponsorships</Link>
                <Link to='/Hike-App'>Explore</Link> 
            </div>
            <div className='footer-link-item'>
                <h2 className='footer-link-header'>Social Media</h2>   
                <Link to='/Hike-App'>Instagram</Link> 
                <Link to='/Hike-App'>Twitter</Link> 
                <Link to='/Hike-App'>TikTok</Link>
                <Link to='/Hike-App'>YouTube</Link> 
                <Link to='/Hike-App'>Facebook</Link> 
                <Link to='/Hike-App'>LinkedIn</Link> 
            </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrapper">
            <div className="social-media-logo">
                <Link className="social-logo" to="/Hike-App">
                    <FontAwesomeIcon icon={faMountain} className='icon-logo'/>
                </Link>
            </div>
            {/* <small className="copyright">
                HIKE © 2023
            </small> */}
            <div className="social-icons">
                <Link 
                    className="social-icon-link instagram" 
                    // opens a home page instead of social media for demo purposes only
                    to='/Hike-App'
                    target='_blank' 
                    aria-label='Instagram'
                >
                    <FontAwesomeIcon icon={faInstagram} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link twitter" 
                    to='/Hike-App'
                    target='_blank' 
                    aria-label='Twitter'
                >
                    <FontAwesomeIcon icon={faTwitter} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link tiktok" 
                    to='/Hike-App'
                    target='_blank' 
                    aria-label='TikTok'
                >
                    <FontAwesomeIcon icon={faTiktok} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link youtube" 
                    to='/Hike-App'
                    target='_blank' 
                    aria-label='YouTube'
                >
                    <FontAwesomeIcon icon={faYoutube} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link facebook" 
                    to='/Hike-App'
                    target='_blank' 
                    aria-label='Facebook'
                >
                    <FontAwesomeIcon icon={faFacebook} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link linkedin" 
                    to='/Hike-App'
                    target='_blank' 
                    aria-label='LinkedIn'
                >
                    <FontAwesomeIcon icon={faLinkedin} className='icon-logo'/>
                </Link>
            </div>
        </div>
      </section>
    </div>
  )
};

export default Footer;
