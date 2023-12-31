import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { REMOVE_HIKE, UPDATE_HIKE, UPDATE_HIKE_ROUTE_LIST, UPDATE_ROUTE, REMOVE_ROUTE } from '../../utils/mutations';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

import '../../style/HikeList.css';

function HikeList({ hike, setMapCenter, setLocationName, setHikeId, calculateRoute, setDirections, setSavedHike, getWeatherData, setWeatherData }) {

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
  setUpdateIndex(_id);
  if (updateState === true && updateIndex === index) {
    handleUpdateHikeMutation(_id, name);
    setUpdateState((prev)=> !prev);
  } else {
    const hikeValueToUpdate = document.getElementById(index).textContent;
    setHikeUpdatedName(hikeValueToUpdate);
    setUpdateState((prev)=> !prev);
  };
};

// exit from edit hike name mode without updating hike name
const handleCancelHikeUpdate = () => {
  setUpdateState((prev)=> !prev);
};

// state for controlled input value for hike name
const [ hikeUpdatedName, setHikeUpdatedName ] = useState('');

// controlled state handler for hike name
const hikeNameUpdateHandler = (e) => {
  const newHikeName = e.target.value;
  setHikeUpdatedName(newHikeName);
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
  if (updateStateHikeRoute === true && updateIndexHikeRoute === index) {
    handleUpdateHikeRouteMutation(_id, routeName);
    setUpdateStateHikeRoute((prev)=> !prev);
  } else {
    const routeValueToUpdate = document.getElementById(index).textContent;
    setHikeRouteUpdatedName(routeValueToUpdate);
    setUpdateStateHikeRoute((prev)=> !prev);
  };
};

// exit from edit hike route name mode without updating hike name
const handleCancelHikeRouteUpdate = () => {
  setUpdateStateHikeRoute((prev)=> !prev);
};

// state for controlled input value for hike route name
const [ hikeRouteUpdatedName, setHikeRouteUpdatedName ] = useState('');

// controlled state handler for hike route name
const hikeRouteNameUpdateHandler = (e) => {
  const newHikeRouteName = e.target.value;
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
  // get weather for chosen hike destination
  getWeatherForHike(lat, lng);
  // control input field view from Map component
  setDirections(false);
  // reset hike name from db
  setSavedHike('');
};

// handle onClick event to display saved hike route in google maps
const googleMapRouteHandler = (origin, destination, routeName, hikeName, lat, lng) => {
  calculateRoute(origin, destination, routeName);
    // reset current location name to the name of the saved hike
    setLocationName(hikeName);
    // get weather for hike destination for the chosen route
    getWeatherForHike(lat, lng);
    setDirections(true);
};

const getWeatherForHike = async (lat, lng) => {
  try {
    const weatherSetData = await getWeatherData(lat, lng);
    setWeatherData(weatherSetData);
  } catch (err) {
    console.error(err);
  };
};

return (
    <>
      {hike.map((hikeItem) => (           
          <li className='hike-item' key={hikeItem._id}>
            {updateState && updateIndex === hikeItem._id ?
              <div
                className='text-item'
              >
                <input
                  className='hike-input'
                  type='text'
                  required
                  value={hikeUpdatedName}
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
                    <p 
                      className='hike-name' 
                      id={hikeItem._id}
                    >
                      {hikeItem.name}
                    </p>
                </div>
              </ button>
            }
          <div className='hike-icons'>
            <button
              className={updateState && updateIndex === hikeItem._id ? 'save-btn': 'edit-btn'}
              onClick={() => handleHikeUpdate(hikeItem._id, hikeItem._id, hikeUpdatedName, updateState)}
            >
              <FontAwesomeIcon
                              icon={updateState && updateIndex === hikeItem._id ? faCheck : faPenToSquare}
                              className='hike-icon'
              />
            </button>
            {updateState && updateIndex === hikeItem._id ?
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
                      onClick={() => googleMapRouteHandler(hikeRoute.origin, hikeRoute.destination, hikeRoute.routeName, hikeItem.name, hikeItem.lat, hikeItem.lng)}
                    >
                      <div>
                        <p 
                          id={hikeRoute._id} className='hike-route-name'
                        >
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
