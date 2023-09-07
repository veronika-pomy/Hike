import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import { useWeatherContext } from '../context/useWeatherContext';
import { useDashContext } from '../context/useDashboardContext';

import HikeList from './sidebar/HikeList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMountain, 
  faPersonHiking,
  faHouse,
  faUser,
  faGear,
  faCloudSun
 } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// sidebar width to change on click
const sidebarOpen = `
  300px
`;

const sidebarClosed = `
  60px
`;

function Sidebar({setMapCenter, setLocationName}) {

  // query user data from server
  const { loading, data } = useQuery(QUERY_USER);
  console.log(data);

  // reset dashboard componenets on logging out or clicking home
  const { setDash } = useDashContext();
  const dashHandler = () => {
    setDash(false);
  };

  const logOut = () => {
    dashHandler();
    AuthService.logout()
  };

  const [sidebarView, setSidebarView] = useState(sidebarOpen);

  const changeStyle = () => {
    if (hikeList && sidebarView === sidebarOpen) {
      setHikeList(false);
    } else if (!hikeList && sidebarView === sidebarClosed) {
      setHikeList(true);
    };

    return sidebarView === sidebarOpen ? setSidebarView(sidebarClosed) : setSidebarView(sidebarOpen);    
  };

  const [ hikeList, setHikeList ] = useState(true);

  const showList = () => {
    // console.log(hikeList);
    return setHikeList((prev)=> !prev);
  };

  // render weather componenet on clicking weather report link
  const { toggleWeather } = useWeatherContext();

  // TODO: a scrollable menu when the number of lis overflows the elements under

  // prevent deconstructing of data obj before it's loaded
  if (loading) {
    return <></>;
  };
  
  const { user } = data;

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
                <div className='hike-list'>
                  <ul>
                    {
                      loading ? <h2>Loading your hikes...</h2> :
                      hikeList && sidebarView === sidebarOpen ? <HikeList hike={user.hike} setMapCenter={setMapCenter} setLocationName={setLocationName}/> : ''
                    }
                  </ul>
                </div>
              
            </div>
        </li>
        <div className='bottom'>
        <li>
            <Link
              onClick={toggleWeather}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faCloudSun} className='user-icon-sidebar'/>
              </span>
              <span
                className='text'
              >
                Weather Report
              </span>
            </Link>
          </li>
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
                <p className='username-text'>
                  {user.username}
                </p>
              </span>
            </Link>
          </li>
          <li>
            <Link
              to='/'
              onClick={() => dashHandler()}
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
              onClick={logOut}
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
