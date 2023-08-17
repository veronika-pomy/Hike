import React from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { REMOVE_HIKE, UPDATE_HIKE } from '../../utils/mutations';

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

  // remove hike by name
  const [ removeHike ] = useMutation(REMOVE_HIKE);

  const handleRemoveHike = async (name) => {
   
    try {

      const { data } = await removeHike({
        variables: { name },
        refetchQueries: [{ query: QUERY_USER }],
      });

    } catch (err) {
      console.error(err);
    };
  };

  return (
    <>
      {hikeArr.map((hikeItem) => (
          <li 
            className='hike-item'
            key={hikeItem._id}
          >
          <div className='text-item'>
            <p>
              {hikeItem.name}
            </p> 
          </div>
          <div 
            className='hike-icons'
            id="remove-icon"
            onClick={() => handleRemoveHike(hikeItem.name)}
          >
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
