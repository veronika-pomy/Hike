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
console.log(hikeArr[0]);

// remap to make object extensible
const hikeArrReMap = hikeArr.map((item) =>
    Object.assign({}, item, {selected:false})
);

  // add index to remapped objs to be able to iterate over in return statement
  for (let i = 0; i < hikeArr.length; i++) {
    hikeArrReMap[i].index = i;
  };


// update hike name
const [ updateHike ] = useMutation(UPDATE_HIKE);

// ISSUE WITH UPDATING QUERY
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

const [ updateState, setUpdateState ] = useState(false);

// handle update and edit mode to input and save update for hike name
const handleHikeUpdate = (name, updateState) => {
  if (updateState === true) {
    console.log(name);
    handleUpdateHikeMutation(name);
    setUpdateState((prev)=> !prev);
  } else {
    setUpdateState((prev)=> !prev);
  };
};

  // state for controlled input value
  const [ hikeUpdatedName, setHikeUpdatedName ] = useState('');
  console.log(hikeUpdatedName);

  // controlled state handler
  const hikeNameUpdateHandler = (e) => {
    const newHikeName = e.target.value;
    setHikeUpdatedName(newHikeName);
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
                  required
                  id={hikeItem.index}
                  value={hikeUpdatedName}
                  onChange={hikeNameUpdateHandler}
                  placeholder='New Hike Name'
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
                onClick={() => handleHikeUpdate(hikeUpdatedName, updateState)}
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
