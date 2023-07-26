import React, { useState, useRef } from 'react';
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
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

// where to center the map, default: Empire State Building 
const center = {
    lat: 40.748817,
    lng: -73.985428
  };

function Map() {
    // loading google maps script
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
        libraries: ['places'],
    });

    // state to control map
    const [map, setMap ] = useState(/** @type google.maps.Map */ (null));

    // states for map responses 
    const [ directions, setDirections ] = useState(null);
    const [ distance, setDistance ] = useState('');
    const [ duration, setDuration ] = useState('');

    // refs for input elements
    /** @type React.MutableObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableObject<HTMLInputElement> */
    const destinationRef = useRef();

    // if not loaded display a chakra ui component demonstrating loading
    if(!isLoaded) {
        return <SkeletonText />
    };

    // function that calculates route from origin to destination
    async function calculateRoute () {
        // only call function when at least one of inputs has values
        if (originRef.current.value === '' || destinationRef.current.value === ''){
            return;
        };

        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();

        // route returs as a promise, use asynchronous functionality 
        const result = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.WALKING // could change to get driving, transit, etc.
        });

        // when result is returned, set it as directions response 
        setDirections(result);

        // log results in console
        console.log(result);

        // set distance and duration responses 
        // use only the first route response
        // text is a human readable response 
        setDistance(result.routes[0].legs[0].distance.text);
        setDuration(result.routes[0].legs[0].duration.text); 
    };

    // clear result of search
    function clearRoute () {
    setDirections(null);
    setDistance('');
    setDuration(''); 
    originRef.current.value = '';
    destinationRef.current.value = '';
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
                        {/* Display Google Maps Box */}
                        {/* Style of the map box is 100% of the parent */}
                        <GoogleMap 
                            center={center} 
                            zoom={15} 
                            mapContainerStyle={{ width:'100%', height:'100%'}}
                            onLoad={(map) => setMap(map)}
                        >
                        {/* Display markers and directions */}
                            <Marker position={center}/>
                            {/* When we get response from google maps, display directions on map */}
                            {directions && <DirectionsRenderer directions={directions} />}
                        </GoogleMap>
                    </Box>
                    <Box
                        p={4}
                        borderRadius='lg'
                        mt={4}
                        bgColor='white'
                        shadow='base'
                        minW='container.md'
                        zIndex='1'
                    >
                        <HStack spacing={2} justifyContent='space-between'>
                        {/* Get google suggestions when entering locations */}
                        <Box flexGrow={1}>
                            <Autocomplete>
                            <Input 
                                type='text' 
                                placeholder='Origin' 
                                ref={originRef}
                            />
                            </Autocomplete>
                        </Box>
                        <Box flexGrow={1}>
                            <Autocomplete>
                            <Input
                                type='text'
                                placeholder='Destination' 
                                ref={destinationRef}
                            />
                            </Autocomplete>
                        </Box>

                        <ButtonGroup>
                            <Button 
                                bg='primary.main' 
                                color='primary.txt'
                                _hover={{bg: 'primary.hover', color: 'primary.main'}}
                                type='submit' 
                                onClick={calculateRoute}
                            >
                            Calculate Route
                            </Button>
                            <IconButton
                            aria-label='clear'
                            icon={
                                <FontAwesomeIcon
                                            icon={
                                                faTimes
                                            }
                                />
                            }
                            onClick={clearRoute}
                            />
                        </ButtonGroup>
                        </HStack>
                        <HStack spacing={4} mt={4} justifyContent='space-between'>
                        <Text>Distance: {distance} </Text>
                        <Text>Duration: {duration} </Text>
                        <IconButton
                            aria-label='center back'
                            icon={<FontAwesomeIcon
                                                icon={
                                                    faLocationArrow   
                                                }
                            />}
                            isRound
                            onClick={() =>map.panTo(center)}
                        />
                        </HStack>
                    </Box>
                </Flex>    
            </div>
            <Weather />
        </div>
    </div>
  )
}

export default Map;
