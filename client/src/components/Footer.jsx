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
                <Link to='/about'>How We Work</Link>
                <Link to='/testimonials'>Testimonials</Link> 
                <Link to='/services'>Our Services</Link> 
                <Link to='/terms'>Terms of Service</Link>
                <Link to='/about'>Giving Back</Link>  
            </div>
            <div className='footer-link-item'>
                <h2 className='footer-link-header'>Contact Us</h2>   
                <Link to='/'>Contact</Link> 
                <Link to='/'>Support</Link> 
                <Link to='/'>Destinations</Link>
                <Link to='/'>Timezones</Link>
                <Link to='/'>Maps</Link>
            </div>
        </div>
        <div className="footer-links-wrapper">
            <div className='footer-link-item'>
                <h2 className='footer-link-header'>Content</h2>   
                <Link to='/'>Featured Brands</Link> 
                <Link to='/'>Submit Your Video</Link> 
                <Link to='/'>Brand Ambassadors</Link> 
                <Link to='/'>Sponsorships</Link>
                <Link to='/'>Explore</Link> 
            </div>
            <div className='footer-link-item'>
                <h2 className='footer-link-header'>Social Media</h2>   
                <Link to='/'>Instagram</Link> 
                <Link to='/'>Twitter</Link> 
                <Link to='/'>TikTok</Link>
                <Link to='/'>YouTube</Link> 
                <Link to='/'>Facebook</Link> 
                <Link to='/'>LinkedIn</Link> 
            </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrapper">
            <div className="social-media-logo">
                <Link className="social-logo" to="/">
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
                    to='/'
                    target='_blank' 
                    aria-label='Instagram'
                >
                    <FontAwesomeIcon icon={faInstagram} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link twitter" 
                    to='/'
                    target='_blank' 
                    aria-label='Twitter'
                >
                    <FontAwesomeIcon icon={faTwitter} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link tiktok" 
                    to='/'
                    target='_blank' 
                    aria-label='TikTok'
                >
                    <FontAwesomeIcon icon={faTiktok} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link youtube" 
                    to='/'
                    target='_blank' 
                    aria-label='YouTube'
                >
                    <FontAwesomeIcon icon={faYoutube} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link facebook" 
                    to='/'
                    target='_blank' 
                    aria-label='Facebook'
                >
                    <FontAwesomeIcon icon={faFacebook} className='icon-logo'/>
                </Link>
                <Link 
                    className="social-icon-link linkedin" 
                    to='/'
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
