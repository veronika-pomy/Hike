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

// remap to make object extensible
const hikeArrReMap = hikeArr.map((item) =>
    Object.assign({}, item, {selected:false})
);

let hikeNames = [];
// add index to remapped objs to be able to iterate over in return statement
for (let i = 0; i < hikeArr.length; i++) {
  hikeArrReMap[i].index = i;
  hikeNames.push(hikeArrReMap[i].name);
};

// console.log(hikeArrReMap);

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
  const [ hikeUpdatedName, setHikeUpdatedName ] = useState(hikeNames);

  // controlled state handler
  const hikeNameUpdateHandler = (e) => {
    const newHikeName = e.target.value;
    const index = Number(e.target.id);
    setHikeUpdatedName((prevArr) => {
      const result = [...prevArr]
      result[index] = newHikeName;
      return result;
    });
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
          <li className='hike-item' key='64fa5441dd650054de3cf73a'>
            <button>
              <div className='text-item'>
                  <p className='hike-name'>
                    Circle Park Trailhead
                  </p>
              </div>
            </ button>
          <div className='hike-icons'>
            <button id='edit-btn'>
              <FontAwesomeIcon icon={faPenToSquare} className='hike-icon' />
            </button>
            <button id='remove-btn'>
              <FontAwesomeIcon icon={faTrash} className='hike-icon' />
            </button>
          </div>
            <ul className='route-sublist'>
            <li key='64fa5441dd650054de3cf74c' className='route-subitem'>
              <button>
                <div>
                  <p>
                    Hike High Park to Cloud Peak Skyway
                  </p>
                </div>
              </button>
              <div className='hike-icons'>
                <button id='edit-btn'>
                  <FontAwesomeIcon icon={faPenToSquare} className='hike-icon-sub' />
                </button>
                <button id='remove-btn'>
                  <FontAwesomeIcon icon={faTrash} className='hike-icon-sub' />
                </button>
              </div>
            </li>
            <li key='64fa5441dd650054de3cf74f' className='route-subitem'>
              <button>
                <div>
                  <p>
                    Red Trail
                  </p>
                </div>
              </button>
              <div className='hike-icons'>
                <button id='edit-btn'>
                  <FontAwesomeIcon icon={faPenToSquare} className='hike-icon-sub' />
                </button>
                <button id='remove-btn'>
                  <FontAwesomeIcon icon={faTrash} className='hike-icon-sub' />
                </button>
              </div>
            </li>
            
          </ul>
        </li>
        <li className='hike-item' key='64fa5441dd650054de3cf73d'>
          <button>
            <div className='text-item'>
              <p className='hike-name'>
                Rio Grande Gorge Trail South
              </p>
            </div>
          </ button>
          <div className='hike-icons'>
            <button id='edit-btn'>
              <FontAwesomeIcon icon={faPenToSquare} className='hike-icon' />
            </button>
            <button id='remove-btn'>
                <FontAwesomeIcon icon={faTrash} className='hike-icon' />
            </button>
            </div>
          <ul className='route-sublist'>
          <li key='64fa5441dd650054de3cf752' className='route-subitem'>
            <button>
              <div>
                <p>
                  Petaca Peak Hike
                </p>
              </div>
            </button>
            <div className='hike-icons'>
          <button id='edit-btn'>
            <FontAwesomeIcon icon={faPenToSquare} className='hike-icon-sub' />
          </button>
          <button id='remove-btn'>
              <FontAwesomeIcon icon={faTrash} className='hike-icon-sub' />
          </button>
          </div>
          </li>
        </ul>
      </li>
      <li className='hike-item' key='64fa5441dd650054de3cf73d'>
          <button>
            <div className='text-item'>
              <p className='hike-name'>
                Rio Grande Gorge Trail South
              </p>
            </div>
          </ button>
          <div className='hike-icons'>
            <button id='edit-btn'>
              <FontAwesomeIcon icon={faPenToSquare} className='hike-icon' />
            </button>
            <button id='remove-btn'>
                <FontAwesomeIcon icon={faTrash} className='hike-icon' />
            </button>
            </div>
          <ul className='route-sublist'>
          <li key='64fa5441dd650054de3cf752' className='route-subitem'>
            <button>
              <div>
                <p>
                  Petaca Peak Hike
                </p>
              </div>
            </button>
            <div className='hike-icons'>
          <button id='edit-btn'>
            <FontAwesomeIcon icon={faPenToSquare} className='hike-icon-sub' />
          </button>
          <button id='remove-btn'>
              <FontAwesomeIcon icon={faTrash} className='hike-icon-sub' />
          </button>
          </div>
          </li>
        </ul>
      </li>
      <li className='hike-item' key='64fa5441dd650054de3cf73d'>
          <button>
            <div className='text-item'>
              <p className='hike-name'>
                Rio Grande Gorge Trail South
              </p>
            </div>
          </ button>
          <div className='hike-icons'>
            <button id='edit-btn'>
              <FontAwesomeIcon icon={faPenToSquare} className='hike-icon' />
            </button>
            <button id='remove-btn'>
                <FontAwesomeIcon icon={faTrash} className='hike-icon' />
            </button>
            </div>
          <ul className='route-sublist'>
          <li key='64fa5441dd650054de3cf752' className='route-subitem'>
            <button>
              <div>
                <p>
                  Petaca Peak Hike
                </p>
              </div>
            </button>
            <div className='hike-icons'>
          <button id='edit-btn'>
            <FontAwesomeIcon icon={faPenToSquare} className='hike-icon-sub' />
          </button>
          <button id='remove-btn'>
              <FontAwesomeIcon icon={faTrash} className='hike-icon-sub' />
          </button>
          </div>
          </li>
        </ul>
      </li>
      <li className='hike-item' key='64fa5441dd650054de3cf73d'>
          <button>
            <div className='text-item'>
              <p className='hike-name'>
                Rio Grande Gorge Trail South
              </p>
            </div>
          </ button>
          <div className='hike-icons'>
            <button id='edit-btn'>
              <FontAwesomeIcon icon={faPenToSquare} className='hike-icon' />
            </button>
            <button id='remove-btn'>
                <FontAwesomeIcon icon={faTrash} className='hike-icon' />
            </button>
            </div>
          <ul className='route-sublist'>
          <li key='64fa5441dd650054de3cf752' className='route-subitem'>
            <button>
              <div>
                <p>
                  Petaca Peak Hike
                </p>
              </div>
            </button>
            <div className='hike-icons'>
          <button id='edit-btn'>
            <FontAwesomeIcon icon={faPenToSquare} className='hike-icon-sub' />
          </button>
          <button id='remove-btn'>
              <FontAwesomeIcon icon={faTrash} className='hike-icon-sub' />
          </button>
          </div>
          </li>
        </ul>
      </li>
      <li className='hike-item' key='64fa5441dd650054de3cf73d'>
          <button>
            <div className='text-item'>
              <p className='hike-name'>
                Rio Grande Gorge Trail South
              </p>
            </div>
          </ button>
          <div className='hike-icons'>
            <button id='edit-btn'>
              <FontAwesomeIcon icon={faPenToSquare} className='hike-icon' />
            </button>
            <button id='remove-btn'>
                <FontAwesomeIcon icon={faTrash} className='hike-icon' />
            </button>
            </div>
          <ul className='route-sublist'>
          <li key='64fa5441dd650054de3cf752' className='route-subitem'>
            <button>
              <div>
                <p>
                  Petaca Peak Hike
                </p>
              </div>
            </button>
            <div className='hike-icons'>
          <button id='edit-btn'>
            <FontAwesomeIcon icon={faPenToSquare} className='hike-icon-sub' />
          </button>
          <button id='remove-btn'>
              <FontAwesomeIcon icon={faTrash} className='hike-icon-sub' />
          </button>
          </div>
          </li>
        </ul>
      </li>
      <li className='hike-item' key='64fa5441dd650054de3cf73d'>
          <button>
            <div className='text-item'>
              <p className='hike-name'>
                Rio Grande Gorge Trail South
              </p>
            </div>
          </ button>
          <div className='hike-icons'>
            <button id='edit-btn'>
              <FontAwesomeIcon icon={faPenToSquare} className='hike-icon' />
            </button>
            <button id='remove-btn'>
                <FontAwesomeIcon icon={faTrash} className='hike-icon' />
            </button>
            </div>
          <ul className='route-sublist'>
          <li key='64fa5441dd650054de3cf752' className='route-subitem'>
            <button>
              <div>
                <p>
                  Petaca Peak Hike
                </p>
              </div>
            </button>
            <div className='hike-icons'>
          <button id='edit-btn'>
            <FontAwesomeIcon icon={faPenToSquare} className='hike-icon-sub' />
          </button>
          <button id='remove-btn'>
              <FontAwesomeIcon icon={faTrash} className='hike-icon-sub' />
          </button>
          </div>
          </li>
        </ul>
      </li>
    </>
  );
};

export default HikeList;
