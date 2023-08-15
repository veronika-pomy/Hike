import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import '../../style/HikeList.css';

// TODO: mutation to delete hike
// TODO: mutation to update the name of hike

// TODO: onclick event that will reset lat and lng based on which hike user is looking at
  // diplay in the Map component

function HikeList({ hike }) {

  // convert hike obj to array to iterate
  const hikeArr = Array.from(hike);

  console.log(hikeArr[0]);

  return (
    <>
      {hikeArr.map((hikeItem) => (
          <li className='hike-item'>
          <div className='text-item'>
            <p>
            {hikeItem.name}
            </p> 
          </div>
          <div className='hike-icons'>
              <FontAwesomeIcon
                              icon={
                                faPenToSquare  
                              }
                              className='hike-icon'
              />
              <FontAwesomeIcon
                              icon={
                                faTrash
                              }
                              className='hike-icon'
              />
            </div>
        </li>
      ))}  
    </>
  );
};

export default HikeList;
