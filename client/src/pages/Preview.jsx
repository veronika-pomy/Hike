/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import '../style/Preview.css';
import { searchVideoYT } from '../utils/youTubeAPI'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const backUpVideoUrlIds = [ 'WfxxyNoAxRU', 'wwm37AmD7j0', 'O8MvC9KDHWI', 'einJJ-MWweA', 'gX3KEBvNh_4' ];

// TODO: check YT api tomorrow - ran out of quota again

const results = await searchVideoYT();

const Preview = () => {

  // in case there is an issue with yt api, default to imbedding yt videos using saved ids via https
  const [ error, setError ] = useState('');
  // preload an id to avoid issues
  const [ videoIds, setVideoIds ] = useState(backUpVideoUrlIds);

  // only once on load
  useEffect(() => {
    if (results.error) {
      // console.log(result.error);
      setError(results.error);
      setVideoIds(backUpVideoUrlIds);
      // console.log('backup used');
    } else {
      let apiVideoDataArr = [];
      for (let i = 0; i <= results.items.length - 1; i++) {
        apiVideoDataArr.push(results.items[0].id.videoId);
        apiVideoDataArr.reverse();
      };
      setVideoIds(apiVideoDataArr);
      // console.log('api used');
    };

    // on first load, set the first video in the array as the current video
    const currentVideoElement = document.getElementById(currentVideo);
    currentVideoElement.setAttribute('style', '{{ visibility: `` }}');
    console.log(currentVideo);
  }, []);

  // onclick arrow handlers
  const arrowHandler = () => {
    console.log('arrow handler clicked');
    console.log(currentVideo);
    console.log(videoIds.indexOf(currentVideo));
    let indexNext = videoIds.indexOf(currentVideo);
    if(indexNext < videoIds.length-1) {
      indexNext += 1;
    } else {
      indexNext = 0;
    };

    setCurrentVideo(videoIds[indexNext]);
    const currentVideoElement = document.getElementById(currentVideo);
    setVisibility('hidden');
     console.log(visibility);
    currentVideoElement.setAttribute('style', '{{ visibility: `` }}');
    console.log(indexNext);
  };

  // track the current video
  const [ currentVideo, setCurrentVideo ] = useState(videoIds[0]);

  // style visibility 
  const [ visibility, setVisibility ] = useState(`hidden`);

  return (
    <>
      <div className='preview'>
        <div className='video-carousel'>
          <button 
            className='carousel-btn'
            onClick={() => arrowHandler()}
          >
            <FontAwesomeIcon icon={faChevronLeft} className='carousel-arrow carousel-arrow--left'/>
          </button>
          <div className='carousel-container'>
            <ul className='carousel-list'>
            <li 
                  className='carousel-item' 
                  id={videoIds[0]}
                  style={{ visibility: `${visibility}` }}
                >
                  <iframe 
                    width="820" 
                    height="515" 
                    // if YT search using API key not possible, will default to using video id directly
                    src={`https://www.youtube.com/embed/${videoIds[0]}`}
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
                </li>
            <li 
                  className='carousel-item' 
                  id={videoIds[1]}
                  style={{ visibility: `${visibility}` }}
                >
                  <iframe 
                    width="820" 
                    height="515" 
                    // if YT search using API key not possible, will default to using video id directly
                    src={`https://www.youtube.com/embed/${videoIds[1]}`}
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
                </li>
                <li 
                  className='carousel-item' 
                  id={videoIds[2]}
                  style={{ visibility: `${visibility}` }}
                >
                  <iframe 
                    width="820" 
                    height="515" 
                    // if YT search using API key not possible, will default to using video id directly
                    src={`https://www.youtube.com/embed/${videoIds[2]}`}
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
                </li>
                <li 
                  className='carousel-item' 
                  id={videoIds[3]}
                  style={{ visibility: `${visibility}` }}
                >
                  <iframe 
                    width="820" 
                    height="515" 
                    // if YT search using API key not possible, will default to using video id directly
                    src={`https://www.youtube.com/embed/${videoIds[3]}`}
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
                </li>
                <li 
                  className='carousel-item' 
                  id={videoIds[4]}
                  style={{ visibility: `${visibility}` }}
                >
                  <iframe 
                    width="820" 
                    height="515" 
                    // if YT search using API key not possible, will default to using video id directly
                    src={`https://www.youtube.com/embed/${videoIds[4]}`}
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
                </li>
              {/* {videoIds.map((videoId) => (
                <li 
                  className='carousel-item' 
                  id={videoId}
                  style={{ visibility: `${visible}` }}
                >
                  <iframe 
                    width="820" 
                    height="515" 
                    // if YT search using API key not possible, will default to using video id directly
                    src={`https://www.youtube.com/embed/${videoId}`}
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
                </li>
              ))} */}
            </ul>
          </div>
          <button 
            className='carousel-btn'
            onClick={() => arrowHandler()}
          >
            <FontAwesomeIcon icon={faChevronRight} className='carousel-arrow carousel-arrow--left'/>
          </button>
        </div>
      </div>
  </>
  )
}

export default Preview;