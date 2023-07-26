import React, { useState }from 'react';
import { Link } from 'react-router-dom';

import HikeList from './sidebar/HikeList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMountain, 
  faPersonHiking,
  faHouse,
  faUser,
  faGear
 } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// sidebar width to change on click
const sidebarOpen = `
  300px
`;

const sidebarClosed = `
  60px
`;

function Sidebar() {

  const [sidebarView, setSidebarView] = useState(sidebarOpen);

  const changeStyle = () => {
    if (hikeList && sidebarView === sidebarOpen) {
      setHikeList(false);
    } else if (!hikeList && sidebarView === sidebarClosed) {
      setHikeList(true);
    };

    return sidebarView === sidebarOpen ? setSidebarView(sidebarClosed) : setSidebarView(sidebarOpen);    
  };

  // TODO: add a state for checking if a user wants the list closed or open on moving sidebar to 300px
  
  const [hikeList, setHikeList] = useState(true);

  const showList = () => {
    console.log(hikeList);
    return setHikeList((prev)=> !prev);
  };

  return (
    <div className='sidebar-container' style={{width: `${sidebarView}`}}>
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
            <div className='hike-list-container'>
              <div className='hike-title'>
                <Link
                  onClick={showList}
                >
                    <span className="icon">
                      <FontAwesomeIcon icon={faPersonHiking} className='hiking-sidebar'/>
                    </span>
                    <span
                      className='text'
                    >
                      My Hikes
                    </span>
                  </Link>
              </div>
              {hikeList ? <HikeList /> : ''}
            </div>
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
