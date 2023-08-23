import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Weather from '../components/Weather';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_HIKE } from '../utils/mutations';

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

import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

function Map() {
    // mutation to save hike to the db for loggedin user
    const [ addHike, { error } ] = useMutation(ADD_HIKE);

    const saveHikeHandler = async (mapCenter, locationName) => {

        try {
    
            await addHike({
                variables: {
                    name: locationName,
                    lng: mapCenter.lng,
                    lat: mapCenter.lat
                },
                refetchQueries: [{ query: QUERY_USER }],
            });

        } catch (err) {
            console.error(err);
        };
    };  
                 
    // TODO: Satellite and terrain view need to move because they are blocked by the aidebar right now

    // TODO: display info view over a marker on click
    
    const defaultLocationName = 'Lost Twin Lakes Hiking Trail Head, MI';
    const defaultLocation = {
        lat: 44.21623,
        lng: -84.68945
    };

    // default center location
    const [ locationName, setLocationName ] = useState(defaultLocationName);

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

    /** @type React.MutableObject<HTMLInputElement> */
    const destinationRef = useRef();


    // if not loaded display a chakra ui component demonstrating loading
    if(!isLoaded) {
        return <SkeletonText />
    };

    // search destination based on user imput
    const searchLocation = async () => {

        // TODO: handle a case if geoLocation data is not found

        try {
        // only call function when destination input has value
         if (destinationRef.current.value === ''){
            return;
        };

        const geoLocationData = await geocodeByAddress(destinationRef.current.value);
        console.log(geoLocationData);
        console.log(geoLocationData[0].results);

        const result = await getLatLng(geoLocationData[0]);
        const formattedAddress = geoLocationData[0].formatted_address;
        // console.log(result);
        // console.log(result.lat);
        // console.log(result.lng);
        // console.log(formattedAddress);

        // when result is returned, set marker to new coordinates   
        setMapCenter(result);
        setLocationName(formattedAddress);

        } catch (err) {
            console.log(err);
        };   
    };

    // seach destination by pressing enter
    const keyPress = (e) => {
        if(e.key === 'Enter') {
            searchLocation();
        };
    };

    // clear route
    function clearRoute() {
        destinationRef.current.value = '';
        setLocationName('');
    };

    // detect address location of marker after it was dragged 
    const detectLocation = (e) => {

        // convert event to string and then parse to json obj
        const locationObject = JSON.parse(JSON.stringify(e));

        // reset map center to the location dragged
        setMapCenter(locationObject.latLng);
        setLocationName(`lat: ${locationObject.latLng.lat}, lon: ${locationObject.latLng.lng}`)
    };

    return (
            <div className='map-wrapper-main'>
                <div className='sidebar-wrapper'>
                    <Sidebar setMapCenter={setMapCenter} setLocationName={setLocationName}/>  
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
                                    zoom={15}
                                    center={mapCenter}
                                    mapContainerStyle={{ width:'100%', height:'100%'}}
                                    onLoad={(map) => setMap(map)}
                                >
                                    <MarkerF 
                                        position={mapCenter}
                                        draggable={true}
                                        onMouseUp={detectLocation}
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
                                            placeholder='Search Your Destination' 
                                            ref={destinationRef}
                                            onKeyUp={keyPress}
                                        />
                                    </Autocomplete>
                                </Box> 
                                <ButtonGroup>
                                    <Button 
                                        bg='primary.main' 
                                        color='primary.txt'
                                        _hover={{bg: 'primary.main', color: 'primary.txt'}}
                                        type='submit' 
                                        onClick={searchLocation}
                                    >
                                        Search
                                    </Button>
                                    <Button 
                                        bg='primary.save' 
                                        color='primary.txt'
                                        _hover={{bg: 'primary.main', color: 'primary.txt'}}
                                        type='submit' 
                                        onClick={() => saveHikeHandler(mapCenter, locationName)}
                                    >
                                        Save
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
                                        onClick={clearRoute}
                                        />
                                        
                                    </HStack>
                                </HStack>
                                {error &&
                                    <Text mt={4} ml={1} color='#cc0000'>
                                        Unable to save hike, please search your destination first.
                                    </Text>
                                }
                            </Box>
                        </Flex>   
                    </div>
                    {/* <Weather lat={mapCenter.lat} lng={mapCenter.lng} location={locationName} /> */}
                </div>
            </div>
    );
}

export default Map;
