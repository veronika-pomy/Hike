import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from './Button';
import '../style/Footer.css';

import { useDashContext } from '../context/useDashboardContext';
import { Link } from 'react-router-dom';

import { ADD_SUBSCRIBER_LIST } from '../utils/mutations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

// TODO: add terms of service page
// TODO: add testimonials page
// TODO: make the links scroll to the top when opening a new page

function Footer() {

    const { dash } = useDashContext();

    // mutation to add a new email to the db
    const [ addSubscriber ] = useMutation(ADD_SUBSCRIBER_LIST);

    // init input state with empty value for a new subscriber email
    const [ subscriberEmail, setSubscriberEmail ] = useState('');

    // state to indicate when email subscription does through correctly
    const [ emailSubSuccess, setEmailSubSuccess ] = useState(false);

    // update input state as user types
    const handleInputChange = (e) => {
        const email = e.target.value;
        setSubscriberEmail(email);
    };

    // save user's email into a db after subscribe button is clicked 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await addSubscriber({ variables: { subscriberEmail } });

            // clear input state afer email is added
            setSubscriberEmail('');

            // set email sub success to true
            setEmailSubSuccess(true);

            
            // config obj to send confirmation email to newsletter subscriber
            const config = {
                Username: process.env.REACT_APP_SMTP_USERNAME,
                Password: process.env.REACT_APP_SMTP_PASSWORD,
                Host: process.env.REACT_APP_SMTP_HOST,
                Port: process.env.REACT_APP_SMTP_PORT,
                To: subscriberEmail,
                From: process.env.REACT_APP_SMTP_FROM,
                Subject: "Welcome to HIKE - Your Trail to Adventure Begins Here!",
                Body: "Welcome to HIKE! We're thrilled to have you join our hiking community. Get ready to explore breathtaking trails, discover hidden gems, and connect with fellow nature enthusiasts. Happy hiking!"
            };
            
            // send a welcome email to new sub
            if (window.Email) {
                window.Email.send(config).then(console.log('Welcome email successfully sent!'));
            };

        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div
            className='footer-container'
            hidden={(!dash ? '' : 'hidden')}
        >
        <section className="footer-sub">
            <p
                className='footer-sub-header'
            >
                Join the Hike newsletter to receive incredible destinations curated for you by our amazing team!
            </p>

            {emailSubSuccess ? 
                <p
                    className='footer-sub-text'
                >
                    Thank you for joing our newsletter! You can unsubscribe at any time.
                </p> 
            :
                <p
                    className='footer-sub-text'
                >
                    You can unsubscribe at any time.
                 </p>
            }
            <div
                className='sub-input-form'
            >
                <form>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='sub-input'
                        value={subscriberEmail}
                        onChange={handleInputChange}
                    />
                    <Button
                        btnStyle='btn-outline'
                        type='submit'
                        onClick={handleSubmit}
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
