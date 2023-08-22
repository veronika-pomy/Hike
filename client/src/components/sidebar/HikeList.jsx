import React, { useDebugValue, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER} from '../../utils/queries';
import { REMOVE_HIKE, UPDATE_HIKE } from '../../utils/mutations';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faSave, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import '../../style/HikeList.css';

// TODO: onclick event that will reset lat and lng based on which hike user is looking at
  // diplay in the Map component

//TODO: update mutation for hike name
  // add error handling for mutations in case something goes wrong 



function HikeList({ hike }) {

// update hike name
const [ updateHike ] = useMutation(UPDATE_HIKE);

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
const handleHikeUpdate = () => {

  if (update === true) {

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

  // add index to remapped objs to be able to iterate over in return statement
  for (let i = 0; i < hikeArr.length; i++) {
    hikeArrReMap[i].index = i;
  };

// // handle update to hike name
//  const handleHikeNameState = (e) => {
//   console.log(hike);
//       console.log(e.target.name);
//       console.log(e.target.value);
//       console.log(e.target.id);
//       const name = e.target.value;
//       console.log(name);
//   const newHikeArr = hikeName.map((hike, i) => {
//     if (e.target.id === i) {
//       console.log(i);
//       return {...hike, name: name};
//     } else {
//       return hike;
//     };
//   });
//   console.log(newHikeArr);
//  // setHikeName();
//  };

  // const name = e.target.value;
  // const id = e.target.id;
  // console.log(name);
  // console.log(id);
  // console.log(hikeName[id].index);
  // console.log(hikeName);
  // setHikeName(hikeName.map((hike) => 
  //   hike.index === id
  //     ? {...hike, name: name}
  //     : {...hike} 
  // ));
 

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

  // state for controlled input value
  const [ hikeUpdatedName, setHikeUpdatedName ] = useState('');

  // controlled state handler 
  const hikeNameUpdateHandler = (e) => {
    const newHikeName = e.target.value;
    console.log(newHikeName);
    setHikeUpdatedName(newHikeName);
  }

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
                onClick={handleHikeUpdate}
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
