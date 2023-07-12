import React from 'react';
import '../style/AppContainer.css';
import Button from './Button';
import '../style/Media.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import videoHome from '../assets/videos/video-1.mp4';

const Media = () => {
  return (
    <div className='media-container'>
        <video 
          src={`${videoHome}`} 
          autoPlay 
          loop 
          muted 
        />
        <h1>ADVENTURE CALLS</h1>
        <p>Embrace the Journey</p>
        <div className="media-btns">
            <Button 
              className='btns' 
              btnStyle='btn--outline' 
              btnSize='btn--large'
              link='/Hike-App/sign-up'
            >
                GET STARTED
            </Button>
            <Button 
              className='btns' 
              btnStyle='btn--primary' 
              btnSize='btn--large'
              link='/Hike-App/preview'
            >
                WATCH PREVIEW <FontAwesomeIcon icon={faPlay} className='media-icon'/>
            </Button>
        </div>
    </div>
  )
}

export default Media;
