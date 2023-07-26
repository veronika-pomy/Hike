import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import '../../style/HikeList.css';

// needs a scrollable menu when the number of lis overflows the elements under

function HikeList() {
  return (
    <div className='hike-list'>
      <ul>
        <li className='hike-item'>
          <div className='text-item'>
          <p>
            Grand Canyon Hike
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
        <li className='hike-item'>
          <p>
          Yosemite National Park
          </p> 
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
        <li className='hike-item'>
          <p>
            Sedona
          </p> 
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
        <li className='hike-item'>
          <p>
            Rocky Mountain
          </p> 
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
        <li className='hike-item'>
          <p>
            Arches
          </p> 
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
        <li className='hike-item'>
          <p>
            Olympic National Park
          </p> 
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
        <li className='hike-item'>
          <p>
            The Wave
          </p> 
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
        <li className='hike-item'>
          <p>
            Acadia National Park
          </p> 
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
        <li className='hike-item'>
          <p>
            Tongass National Forest
          </p> 
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
        <li className='hike-item'>
          <p>
            Smith Rock
          </p> 
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
      </ul>
    </div>
  )
}

export default HikeList;
