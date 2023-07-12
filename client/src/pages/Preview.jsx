import React, { useState } from 'react';

import { searchVideoYT } from '../utils/youTubeAPI'; 

const backUpUrlId = 'heH-qCBCWZU';

const result = await searchVideoYT();

const videoId = result.items[0].id.videoId;

const Preview = () => {
  return (
    <div className='preview'>
      <iframe 
        width="560" 
        height="315" 
        // if YT search using API key not possible, will default to using video id directly
        src={`https://www.youtube.com/embed/${result ? videoId : backUpUrlId}`}
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
  )
}

export default Preview;