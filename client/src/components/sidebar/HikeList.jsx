import React, { useDebugValue, useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { REMOVE_HIKE, UPDATE_HIKE } from '../../utils/mutations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faSave, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import '../../style/HikeList.css';

// TODO: onclick event that will reset lat and lng based on which hike user is looking at
  // diplay in the Map component

//TODO: update mutation for hike name
//TODO: add error handling for mutations in case something goes wrong 

function HikeList({ hike }) {

// update hike name
const [ updateHike, { error } ] = useMutation(UPDATE_HIKE);

const handleUpdateHikeMutation = async (name) => {
   
  try {

    const { data } = await updateHike({
      variables: { name },
      refetchQueries: [{ query: QUERY_USER }],
    });

  } catch (err) {
    console.error(err);
  };

};

// convert hike obj to array to iterate
const hikeArr = Array.from(hike);

const [ updateState, setUpdateState ] = useState(false);

// handle update and edit mode to input and save update for hike name
const handleHikeUpdate = (name, update) => {

  if (update === true) {
    console.log(name);
    // handleUpdateHikeMutation(name);
    setUpdateState((prev)=> !prev);
  } else {
    setUpdateState((prev)=> !prev);
  };

};

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
 const handleHikeNameState = (e) => {
  const name = e.target.value;
  const id = Number(e.target.id);
  console.log(name);
  console.log(id);
  console.log(hikeName[id]);
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
            {updateState ?
              <div
              className='text-item'
              >
                <input 
                  className='hike-input'
                  type='text'
                  id={hikeItem.index}
                  value={hikeName[hikeItem.index].name}
                  onChange={handleHikeNameState}
                /> 
              </div>
            :
              <div className='text-item'>
                <p>
                  {hikeItem.name}
                </p>
              </div> 
            }
          <div 
            className='hike-icons'
          >
              <button
                id={updateState ? 'save-btn': 'edit-btn'}
                onClick={()=> handleHikeUpdate(hikeName[hikeItem.index], updateState)}
              >
                <FontAwesomeIcon
                                icon={updateState ? faCheck : faPenToSquare}
                                className='hike-icon'          
                />
              </button>
            {updateState ?
              <></>
             :
             <button
                id='remove-btn'
                onClick={() => handleRemoveHike(hikeItem.name)}
              >
                <FontAwesomeIcon
                                icon={
                                  faTrash
                                }
                                className='hike-icon'          
                />
            </button>}
            </div>
        </li>
      ))}  
    </>
  );
};

export default HikeList;
