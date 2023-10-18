/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import '../style/Preview.css';
import { searchVideoYT } from '../utils/youTubeAPI'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// in case api key expires or other retrieval errors
const backUpVideoUrlIds = [ 'WfxxyNoAxRU', 'wwm37AmD7j0', 'O8MvC9KDHWI', 'einJJ-MWweA', 'gX3KEBvNh_4' ];

// get api data
const youTubeData = await searchVideoYT();
// remove the last item containing channel info, not video info if yt data retrieved without errors
if (!youTubeData.error) youTubeData.items.pop();

const Preview = () => {
  
  // state to hold video ids array
  const [ videoIds, setVideoIds ] = useState(backUpVideoUrlIds);
  // state to chnage index of the video url to display
  const [ currentVideoIndex, setSurrentVideoIndex ] = useState(0);

  const youTubeApiVideoIds = youTubeData.items;

  // check if data was returned
  useEffect(() => {
    if (youTubeData.error) {
      // console.log('backup used');
      return;
    } else {
      let youTubeApiIds = [];
      // get needed video ids from YT api data
      for (const youTubeApiVideoId of youTubeApiVideoIds) {
        youTubeApiIds.push(youTubeApiVideoId.id.videoId);
      };
      setVideoIds(youTubeApiIds);
      // console.log('api used');
    };
  }, []);

  const previousVideo = () => {
    // check for first index in arr 
    const isFirstVideo = currentVideoIndex === 0;
    const newVideoIndex = isFirstVideo ? videoIds.length - 1 : currentVideoIndex - 1;
    
    // set new index
    setSurrentVideoIndex(newVideoIndex);
  };

  const nextVideo = () => {
    // check for last index in arr 
    const isLastVideo = currentVideoIndex === videoIds.length - 1;
    const newVideoIndex = isLastVideo ? 0 : currentVideoIndex + 1;
    
    // set new index
    setSurrentVideoIndex(newVideoIndex);
  };

  return (
    <>
      <div className='preview'>
        <div className='carousel-container'>
          <div className='video-container'>
            <button
              className='left-arrow'
              onClick={() => previousVideo()}
            >
              <FontAwesomeIcon icon={faChevronLeft} className='chevron'/>
            </button>
            <button
              className='right-arrow'
              onClick={() => nextVideo()}
            >
              <FontAwesomeIcon icon={faChevronRight} className='chevron'/>
            </button>
            <iframe 
              className='video-item'
              src={`https://www.youtube.com/embed/${videoIds[currentVideoIndex]}`}
              title="YouTube video player" 
              allow="accelerometer; 
                    autoplay; 
                    clipboard-write; 
                    encrypted-media; 
                    gyroscope; 
                    picture-in-picture; 
                    web-share" 
              allowFullScreen
              alt="Video is not available"
            >
            </iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;