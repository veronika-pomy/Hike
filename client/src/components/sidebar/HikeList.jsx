import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { REMOVE_HIKE, UPDATE_HIKE } from '../../utils/mutations';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

import '../../style/HikeList.css';

function HikeList({ hike, setMapCenter, setLocationName }) {

// convert hike obj to array to iterate
const hikeArr = Array.from(hike);
// console.log(hikeArr[0]);

// remap to make object extensible
const hikeArrReMap = hikeArr.map((item) =>
    Object.assign({}, item, {selected:false})
);

  // add index to remapped objs to be able to iterate over in return statement
  for (let i = 0; i < hikeArr.length; i++) {
    hikeArrReMap[i].index = i;
  };

//  console.log(hikeArrReMap[0]);

// update hike name
const [ updateHike ] = useMutation(UPDATE_HIKE);

const handleUpdateHikeMutation = async (_id, name) => {

  try {

    const { data } = await updateHike({
      variables: { 
        _id: _id, 
        name: name 
      },
      refetchQueries: [{ query: QUERY_USER }],
    });

  } catch (err) {
    console.error(err);
  };

};

const [ updateState, setUpdateState ] = useState(false);
const [ updateIndex, setUpdateIndex ] = useState('');

// handle update and edit mode to input and save update for hike name
const handleHikeUpdate = (_id, index, name, updateState) => {
  setUpdateIndex(index);
  if (updateState === true) {
    handleUpdateHikeMutation(_id, name);
    setUpdateState((prev)=> !prev);
  } else {
    setUpdateState((prev)=> !prev);
  };
};

// exit from edit hike name mode without updating hike name
const handleCancelHikeUpdate = () => {
  setUpdateState((prev)=> !prev);
};

  // state for controlled input value
  const [ hikeUpdatedName, setHikeUpdatedName ] = useState('');
  // console.log(hikeUpdatedName);

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

  // handle onClick even to display saved hike in google maps
  const googleMapHandler = (lat,lng, name) => {
    const chosenMapCoordinates = {
      lat: lat,
      lng: lng
    };

    const chosenHikeName = name;

    //reset map pin to a user-chosen hike on click
    setMapCenter(chosenMapCoordinates);
    // reset current location name to the name of the saved hike
    setLocationName(chosenHikeName);
  };

  return (
    <>
      {hikeArrReMap.map((hikeItem) => (              
          <li
            className='hike-item'
            key={hikeItem._id}
          >
            {updateState && updateIndex === hikeItem.index ?
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
              <button
                onClick={()=> googleMapHandler(hikeItem.lat,hikeItem.lng, hikeItem.name)}
              >
                <div className='text-item'>
                    <p>
                      {hikeItem.name}
                    </p>
                </div>
              </ button>
            }
          <div
            className='hike-icons'
          >
              <button
                id={updateState ? 'save-btn': 'edit-btn'}
                onClick={() => handleHikeUpdate(hikeItem._id, hikeItem.index, hikeUpdatedName, updateState)}
              >
                <FontAwesomeIcon
                                icon={updateState ? faCheck : faPenToSquare}
                                className='hike-icon'
                />
              </button>
            {updateState && updateIndex === hikeItem.index ?
              <button
                id='cancel-btn'
                onClick={() => handleCancelHikeUpdate()}
              >
                <FontAwesomeIcon
                                icon={
                                  faTimes
                                }
                                className='hike-icon'
                />
             </button>
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
                </button>
            }
            </div>
        </li>
      ))}
    </>
  );
};

export default HikeList;
