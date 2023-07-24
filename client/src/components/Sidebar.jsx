import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';
import { faPersonHiking } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

// add state for changing sidebar width on click

const changeStyle = () => {
  console.log('hello');
};

const sidebarOpen = `
  300px
`;

const sidebarClosed = `
  60px
`;

function Sidebar() {
  return (
    <div className='sidebar-container' style={{width: `${sidebarOpen}`}}>
      <ul> 
        <li className='logo'>
          <Link
            onClick={changeStyle}
          >
          <span className="icon">
            <FontAwesomeIcon icon={faMountain} className='logo-sidebar'/>
          </span>
          <span
            className='text'  
          >
            HIKE
          </span>
        </Link>
        </li>
        <li>
          <Link>
          <span className="icon">
            <FontAwesomeIcon icon={faPersonHiking} className='hiking-sidebar'/>
          </span>
          <span
            className='text'
          >
            Hikes
          </span>
          </Link>
        </li>
        <div className='bottom'>
          <li>
            <Link
              to='#'
            >
              <span className="icon">
                <FontAwesomeIcon icon={faUser} className='user-icon-sidebar'/>
              </span>
              <span
                className='text'
              >
              User Account
              </span>
            </Link>
          </li>
          <li>
            <Link
              to='/'
            >
              <span className="icon">
                <FontAwesomeIcon icon={faHouse} className='home-icon-sidebar'/>
              </span>
              <span
                className='text'  
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              to='#'
            >
              <span className="icon">
                <FontAwesomeIcon icon={faGear} className='settings-icon-sidebar'/>
              </span>
              <span
                className='text'  
              >
                Settings
              </span>
            </Link>
          </li>
          <li>
            <Link
              to='/'
            >
              <span className="icon">
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout-icon-sidebar'/>
              </span>
              <span
                className='text'  
              >
                Log out
              </span>
            </Link>
          </li>
      </div>
      </ul>
    </div>
  )
}

export default Sidebar;
