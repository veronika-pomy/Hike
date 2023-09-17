import React, { useState, useEffect } from 'react';
import '../style/Preview.css';
import { searchVideoYT } from '../utils/youTubeAPI'; 

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
      };
      setVideoIds(apiVideoDataArr);
      // console.log('api used');
    };
  }, []);

  return (
    <>
      <div className='preview'>
        <div className='video-carousel'>
          <button className='carousel-btn'>
          </button>
          <div className='casousel-container'>
            <ul className='carousel-list'>
              {videoIds.map((videoId) => (
                <li className='carousel-item'>
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
                  >
                  </iframe>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  </>
  )
}

export default Preview;