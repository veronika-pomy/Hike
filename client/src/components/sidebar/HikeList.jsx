import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { REMOVE_HIKE, UPDATE_HIKE, UPDATE_HIKE_ROUTE_LIST, UPDATE_ROUTE, REMOVE_ROUTE } from '../../utils/mutations';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

import '../../style/HikeList.css';

function HikeList({ hike, setMapCenter, setLocationName, setHikeId, calculateRoute, setDirections, setSavedHike }) {

// convert hike obj to array to iterate
const hikeArr = Array.from(hike);

// remap to make object extensible
const hikeArrReMap = hikeArr.map((item) =>
    Object.assign({}, item, {selected:false})
);

let hikeNames = [];

// add index to remapped objs to iterate over in return statement
for (let i = 0; i < hikeArrReMap.length; i++) {
  hikeArrReMap[i].index = i;
  hikeNames.push(hikeArrReMap[i].name);
};

// console.log(hikeArrReMap);
// console.log(hikeArrReMap[0].route);

// update hike name
const [ updateHike ] = useMutation(UPDATE_HIKE);

// update hike name
const [ updateHikeRouteList ] = useMutation(UPDATE_HIKE_ROUTE_LIST);

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

// state for controlled input value for hike name
const [ hikeUpdatedName, setHikeUpdatedName ] = useState(hikeNames);

// controlled state handler for hike name
const hikeNameUpdateHandler = (e) => {
  const newHikeName = e.target.value;
  const index = Number(e.target.id);
  setHikeUpdatedName((prevArr) => {
    const result = [...prevArr];
    result[index] = newHikeName;
    return result;
  });
};

// update hike route name
const [ updateRoute ] = useMutation(UPDATE_ROUTE);

const handleUpdateHikeRouteMutation = async (_id, routeName) => {
  try {
    const { data } = await updateRoute({
      variables: { 
        _id: _id, 
        routeName: routeName
      },
      refetchQueries: [{ query: QUERY_USER }],
    });

  } catch (err) {
    console.error(err);
  };
};

const [ updateStateHikeRoute, setUpdateStateHikeRoute ] = useState(false);
const [ updateIndexHikeRoute, setUpdateIndexHikeRoute ] = useState('');

const handleUpdateHikeRoute = (_id, index, routeName, updateStateHikeRoute) => {
  setUpdateIndexHikeRoute(index);
  if (updateStateHikeRoute === true) {
    handleUpdateHikeRouteMutation(_id, routeName);
    setUpdateStateHikeRoute((prev)=> !prev);
  } else {
    const valueToUpdate = document.getElementById(index).textContent;
    setHikeRouteUpdatedName(valueToUpdate);
    setUpdateStateHikeRoute((prev)=> !prev);
  };
};

// exit from edit hike route name mode without updating hike name
const handleCancelHikeRouteUpdate = () => {
  setUpdateIndexHikeRoute((prev)=> !prev);
};

// state for controlled input value for hike route name
const [ hikeRouteUpdatedName, setHikeRouteUpdatedName ] = useState('');

// controlled state handler for hike route name
const hikeRouteNameUpdateHandler = (e) => {
  const newHikeRouteName = e.target.value;
  // console.log(newHikeRouteName);
   setHikeRouteUpdatedName(newHikeRouteName);
};

// remove hike
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

// remove hike route 
const [ removeRoute ] = useMutation(REMOVE_ROUTE);

const handleRemoveHikeRoute = async (routeName, index) => {
  try {
    const { data } = await removeRoute({
      variables: { routeName },
      refetchQueries: [{ query: QUERY_USER }],
    });

    console.log(data.removeRoute);

    // update hike list
    await updateHikeRouteList({
      variables:{ _id: index, index: data.removeRoute._id},
    });

  } catch (err) {
    console.error(err);
  };
};

// handle onClick event to display saved hike in google maps
const googleMapHandler = (lat,lng, name, id) => {
  //resets hikeId in the Map component to save a new route for hike and update the db
  setHikeId(id);

  const chosenMapCoordinates = {
    lat: lat,
    lng: lng
  };

  const chosenHikeName = name;

  //reset map pin to a user-chosen hike on click
  setMapCenter(chosenMapCoordinates);
  // reset current location name to the name of the saved hike
  setLocationName(chosenHikeName);
  // control input field view from Map component
  setDirections(false);
  // reset hike name from db
  setSavedHike('');
};

// handle onClick event to display saved hike route in google maps
const googleMapRouteHandler = (origin, destination, routeName) => {
  console.log('google map route handler clicked');
   calculateRoute(origin, destination, routeName);
   setDirections(true);

};

return (
    <>
      {hikeArrReMap.map((hikeItem) => (           
          <li className='hike-item' key={hikeItem._id}>
            {updateState && updateIndex === hikeItem.index ?
              <div
                className='text-item'
              >
                <input
                  className='hike-input'
                  type='text'
                  required
                  id={hikeItem.index}
                  value={hikeUpdatedName[Number(hikeItem.index)]}
                  onChange={hikeNameUpdateHandler}
                  placeholder='Enter new hike name'
                />
              </div>
            :
              <button
                className='map-handler'
                onClick={()=> googleMapHandler(hikeItem.lat, hikeItem.lng, hikeItem.name, hikeItem._id)}
              >
                <div className='text-item'>
                    <p className='hike-name'>
                      {hikeItem.name}
                    </p>
                </div>
              </ button>
            }
          <div className='hike-icons'>
            <button
              className={updateState && updateIndex === hikeItem.index ? 'save-btn': 'edit-btn'}
              onClick={() => handleHikeUpdate(hikeItem._id, hikeItem.index, hikeUpdatedName[Number(hikeItem.index)], updateState)}
            >
              <FontAwesomeIcon
                              icon={updateState && updateIndex === hikeItem.index ? faCheck : faPenToSquare}
                              className='hike-icon'
              />
            </button>
            {updateState && updateIndex === hikeItem.index ?
              <button
                className='cancel-btn'
                onClick={() => handleCancelHikeUpdate()}
              >
                <FontAwesomeIcon
                                icon={faTimes}
                                className='hike-icon'
                />
              </button>
              :
                <button
                    className='remove-btn'
                    onClick={() => handleRemoveHike(hikeItem.name)}
                  >
                    <FontAwesomeIcon
                                    icon={faTrash}
                                    className='hike-icon'
                    />
                </button>
            }
            </div>
            <ul className='route-sublist' key={hikeItem._id}>
              {hikeItem.route.map((hikeRoute) => (
              <>
                <li key={hikeRoute._id} className='route-subitem'>
                  {updateStateHikeRoute && updateIndexHikeRoute === hikeRoute._id ?
                  <div
                    className='text-item'
                  >
                    <input
                      className='hike-route-input'
                      type='text'
                      required
                      value={hikeRouteUpdatedName}
                      onChange={hikeRouteNameUpdateHandler}
                      placeholder='Enter new hike route name'
                    />
                  </div>
                  :
                    <button
                      className='map-handler'
                      onClick={() => googleMapRouteHandler(hikeRoute.origin, hikeRoute.destination, hikeRoute.routeName)}
                    >
                      <div>
                        <p id={hikeRoute._id} className='hike-route-name'>
                          {hikeRoute.routeName}
                        </p>
                      </div>
                    </button>
                  }
                  <div className='hike-icons'>
                    <button 
                      className={updateStateHikeRoute && updateIndexHikeRoute === hikeRoute._id ? 'save-btn' : 'edit-btn'}
                      onClick={() => (handleUpdateHikeRoute(hikeRoute._id, hikeRoute._id, hikeRouteUpdatedName, updateStateHikeRoute))}
                    >
                      <FontAwesomeIcon
                                      icon={updateStateHikeRoute && updateIndexHikeRoute === hikeRoute._id ? faCheck : faPenToSquare}
                                      className='hike-icon-sub' 
                      />
                    </button>
                    {updateStateHikeRoute && updateIndexHikeRoute === hikeRoute._id ?
                      <button
                        className='cancel-btn'
                        onClick={() => (handleCancelHikeRouteUpdate())}
                      >
                        <FontAwesomeIcon icon={faTimes} className='hike-icon-sub' />
                      </button>
                    :
                      <button 
                        className='remove-btn' 
                        onClick={() => (handleRemoveHikeRoute(hikeRoute.routeName, hikeItem._id))}
                      >
                        <FontAwesomeIcon icon={faTrash} className='hike-icon-sub' />
                      </button>
                    }
                  </div>
                </li>
                </>))
              }
              </ul>
            </li>  
      ))}
    </>
  );
};

export default HikeList;
