import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Weather from '../components/Weather';

import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    Skeleton,
    SkeletonText,
    Text,
  } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faTimes } from '@fortawesome/free-solid-svg-icons';

// check if map is loaded
import { useJsApiLoader, GoogleMap, MarkerF, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

function Map() {

    // TODO: Sattelite and terrain view need to move because they are blocked by the aidebar right now

    // default center location is Lost Twin Lakes Hiking Trail head, MI
    const defaultLocation = {
        lat: 44.21623,
        lng: -84.68945
    };

    // center map 
    const [ mapCenter, setMapCenter ] = useState(defaultLocation);

    const libraries = ['places'];

    // load map
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
        libraries: libraries,
    });

     // state to control map
     const [ map, setMap ] = useState(/** @type google.maps.Map */ (null));

    // if not loaded display a chakra ui component demonstrating loading
    if(!isLoaded) {
        return <SkeletonText />
    };

    return (
    <div className='map-wrapper-main'>
        <div className='sidebar-wrapper'>
            <Sidebar />  
        </div>
        <div className='map-weather-wrapper'>
            <div className='map-container'>
                <Flex
                    position='relative'
                    flexDirection='column'
                    alignItems='center'
                    // bgImage='https://source.unsplash.com/random/2000x1100/?travel'
                    // bgPos='bottom'
                    h='100%'
                    w='100%'
                >
                    <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                        <GoogleMap
                            zoom={10}
                            center={mapCenter}
                            mapContainerStyle={{ width:'100%', height:'100%'}}
                            onLoad={(map) => setMap(map)}
                        >
                            <MarkerF 
                                position={mapCenter}
                                draggable={true}
                            />

                        </GoogleMap>
                    </Box>
                </Flex>   
            </div>
            <Weather lat={mapCenter.lat} lng={mapCenter.lng} />
        </div>
    </div>
    );
}

export default Map;
