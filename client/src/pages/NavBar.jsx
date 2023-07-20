import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Button from '../components/Button';


// TODO: Need to find better logic for not showing sign up button, it's noticable when re-rendering before it goes away

function NavBar() {

  // state to switch between open and closed menu icon
  const [ click, setClick ] = useState(false);

  // state for the button
  const [ button , setButton ] = useState(true);

  // handle clicking on menu icon to trigger state change reversal
  const handleClick = () => setClick(!click);

  // handle closeing menu on smaller devises
  const closeMobileMenu = () => setClick(false);

  // show sign up button on mobile menu
  const showButton = () => {
    if(window.innerWidth <= 960){
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // stop sign up button from re-rending on refresh 
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className="navbar-container">
            {/* use link to replace a tag */}
            <Link
                to='/'
                className='navbar-logo'
                onClick={closeMobileMenu}
            >
                HIKE <FontAwesomeIcon icon={faMountain} className='icon-logo'/>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <FontAwesomeIcon icon={
                                    click ? faXmark : faBars
                                  }
                                  className='icon'
              />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                  Services
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/sign-in' className='nav-links' onClick={closeMobileMenu}>
                  Sign In
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </li>
            </ul>
            {button && 
              <Button
                btnStyle='btn--outline' 
                link='/sign-up'
              >
                SIGN UP
              </Button>}
        </div>
      </nav>
    </>
  )
}

export default NavBar;
