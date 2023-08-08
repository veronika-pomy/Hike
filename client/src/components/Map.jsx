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
    SkeletonText,
    Text
  } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faTimes } from '@fortawesome/free-solid-svg-icons';

// check if map is loaded
import { useJsApiLoader,
        GoogleMap, 
        MarkerF, 
        InfoWindow, 
        Autocomplete
} from '@react-google-maps/api';

function Map() {

    // TODO: Satellite and terrain view need to move because they are blocked by the aidebar right now

    // TODO: display info view over a marker on click 

    // default center location
    const [locationName, setLocationName ] = useState('Lost Twin Lakes Hiking Trail head, MI');

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

    // TODO: Function to search based on user imput
    // TODO: Function to clear route
    // TODO: Function to save coordinates when user is logged in
    // TODO: Function to retrive and set coordinates when user is logged in and clicks on saved hike

    return (
    <div className='map-wrapper-main'>
        <div className='sidebar-wrapper'>
            <Sidebar />  
        </div>
        <div className='map-weather-wrapper'>
            <div className='map-container'>
                {/* GOOGLE MAP */}
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
                       {/* SEARCH BAR */}
                 <Box
                        p={4}
                        borderRadius='lg'
                        mt={6}
                        bgColor='white'
                        shadow='base'
                        minW='container.md'
                        zIndex='1'
                    >

                        <HStack spacing={2} justifyContent='space-between'>
                        {/* Get google suggestions when entering location */}
                        <Box flexGrow={1}>
                            <Autocomplete>
                            <Input 
                                type='text' 
                                placeholder='Destination' 
                            />
                            </Autocomplete>
                        </Box> 
                        <ButtonGroup>
                            <Button 
                                bg='primary.main' 
                                color='primary.txt'
                                _hover={{bg: 'primary.main', color: 'primary.txt'}}
                                type='submit' 
                            >
                                Search
                            </Button>
                            <Button 
                                bg='primary.save' 
                                color='primary.txt'
                                _hover={{bg: 'primary.main', color: 'primary.txt'}}
                                type='submit' 
                            >
                                Save Hike
                            </Button>
                        </ButtonGroup>
                        </HStack>
                        <HStack justifyContent='space-between'>
                        <Text mt={4} ml={1}>
                            Current Location:
                            <Text  as='i'> {locationName}</Text>
                        </Text>
                            <HStack spacing={4} mt={4} justifyContent='right'>
                            <IconButton
                                aria-label='center back'
                                icon={<FontAwesomeIcon
                                                    icon={
                                                        faLocationArrow   
                                                    }
                                />}
                                isRound
                                onClick={() => map.panTo(mapCenter)}
                            />
                            <IconButton
                                aria-label='clear'
                                icon={
                                    <FontAwesomeIcon
                                                icon={
                                                    faTimes
                                                }
                                    />
                                }
                                />
                            </HStack>
                        </HStack>
                    </Box>
                </Flex>   
            </div>
            <Weather lat={mapCenter.lat} lng={mapCenter.lng} />
        </div>
    </div>
    );
}

export default Map;
