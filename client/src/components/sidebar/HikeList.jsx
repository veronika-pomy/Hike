import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { REMOVE_HIKE, UPDATE_HIKE } from '../../utils/mutations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import '../../style/HikeList.css';

// TODO: onclick event that will reset lat and lng based on which hike user is looking at
  // diplay in the Map component

function HikeList({ hike }) {

// convert hike obj to array to iterate
const hikeArr = Array.from(hike);
// console.log(hikeArr[0]);

const [ updateState, setUpdateState ] = useState(false);

// remap to make object extensible
const hikeArrReMap = hikeArr.map((item) => 
    Object.assign({}, item, {selected:false})
);

  // var to hold hike names for state changes
  const hikeNames = [];
  for (let i = 0; i < hikeArr.length; i++) {
    hikeNames.push(hikeArr[i]);
  };

  // add index to remapped objs to be able to iterate over in return statement
  for (let i = 0; i < hikeArr.length; i++) {
      hikeArrReMap[i].index = i;
  };

  // init state for hike name
  const [ hikeName, setHikeName ] = useState(hikeNames);

// handle update to hike name
 const handleHikeNameUpdate = (e) => {
  const name = e.target.value;
  const id = Number(e.target.id);
  setHikeName(hikeName.map((hike) => 
    hike.id === id && name 
  ));
 };

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
      {hikeArrReMap.map((hikeItem) => (
          <li 
            className='hike-item'
            key={hikeItem._id}
          >
            <div
              className='text-item'
            >
              <input 
                className='hike-input'
                type='text'
                id={hikeItem.index}
                value={hikeName[hikeItem.index].name}
                onChange={handleHikeNameUpdate}
              /> 
          </div>
          {/* <div className='text-item'>
            <p>
              {hikeItem.name}
            </p>
          </div> */}
          <div 
            className='hike-icons'
          >
              {
                <FontAwesomeIcon
                  icon={
                    faCheck  
                  }
                  className='hike-icon'
                  onClick={()=> setUpdateState(false)}
                />
              }
              {/* <FontAwesomeIcon
                              icon={
                                faPenToSquare  
                              }
                              className='hike-icon'
                              onClick={()=> setUpdateState(true)}
              />
              <FontAwesomeIcon
                              icon={
                                faTrash
                              }
                              className='hike-icon'
                              onClick={() => handleRemoveHike(hikeItem.name)}
                              
              /> */}
            </div>
        </li>
      ))}  
    </>
  );
};

export default HikeList;
