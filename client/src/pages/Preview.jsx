import React, { useState, useEffect } from 'react';
import { searchVideoYT } from '../utils/youTubeAPI'; 

// TODO: build a video carousel, check tomorrow api - ran out of quota

const backUpVideoUrlIds = [ 'heH-qCBCWZU', 'xEqOTy8zd6I', 'RSgC-sxfrBM', 'mfX519lK4VA', 'vjRJEFOn5nc' ];

const result = await searchVideoYT();

const Preview = () => {

  // in case there is an issue with yt api, default to imbedding yt videos using saved ids via https
  const [ error, setError ] = useState('');
  // preload an id to avoid issues
  const [ videoId, setVideoId ] = useState('vjRJEFOn5nc');

  // only once on load
  useEffect(() => {
    if (result.error) {
      console.log(result.error);
      setError(result.error);
      setVideoId(backUpVideoUrlIds[0]);
      console.log('backup used');
    } else {
      // get rid of the last object in data arr due to it not being video related 
      result.items.pop();
      // reverse chronologically for the last video to be first
      const resultReverseArr = result.items.reverse();  
      const videoId = resultReverseArr[0].id.videoId;
      setVideoId(videoId);
      console.log('api used');
    };
  }, []);

  return (
    <>
      <div className='preview'>
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
      </div>
  </>
  )
}

export default Preview;