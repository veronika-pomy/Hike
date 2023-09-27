/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Weather from '../components/Weather';
import { useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_HIKE, ADD_ROUTE } from '../utils/mutations';

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

import { useJsApiLoader,
        GoogleMap, 
        MarkerF, 
        Autocomplete,
        DirectionsRenderer,
        InfoWindowF
} from '@react-google-maps/api';

import {
    geocodeByAddress,
  } from 'react-places-autocomplete';

// TODO: fix - "Calculate Route" works on second click on the btn but not the first click???

function Map() {
    // save hike location
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

    // save hike route
    const [ addRoute ] = useMutation(ADD_ROUTE);

    const [ hikeId, setHikeId ]= useState('');

    const saveRouteHandler = async () => {
        try {
            await addRoute ({
                variables: {
                    routeName: `Trail from ${originRef.current.value} to ${destinationRef.current.value}`,
                    origin: originRef.current.value,
                    destination: destinationRef.current.value,
                    hikeName: locationName,
                    index: hikeId
                },
                refetchQueries: [{ query: QUERY_USER }],
            });
        } catch (err) {
            console.error(err);
        };
    };
            
    // TODO: Satellite and terrain view need to move because they are blocked by the aidebar right now

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
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    // state to control map
     const [ map, setMap ] = useState(/** @type google.maps.Map */ (null));

    // state to control directions option
    const [ directions, setDirections ] = useState(false);
    const [resultDirectionsService, setResultDirectionsService] = useState('');
    
    // variables for directions response  
    const [ directionsResponse, setDirectionsResponse ] = useState(null);
    const [ distance, setDistance ] = useState('');
    const [ duration, setDuration ] = useState('');

    // hold hike name when seleted from db
    const [savedHike, setSavedHike ] = useState('');

    // refs for origin and destination for directions functionality
    /** @type React.MutableObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableObject<HTMLInputElement> */
    const destinationRef = useRef();

    /** @type React.MutableObject<HTMLInputElement> */
    const searchRef = useRef();

    // if not loaded display a chakra ui component demonstrating loading
    if(!isLoaded) {
        return <SkeletonText />
    };

    // search destination based on user input
    const searchLocation = async () => {

        // TODO: handle a case if geoLocation data is not found

        try {
        // only call function when destination input has value
         if (searchRef.current.value === ''){
            return;
        };

        const geoLocationData = await geocodeByAddress(searchRef.current.value);

        const result = await getLatLng(geoLocationData[0]);
        const formattedAddress = geoLocationData[0].formatted_address;

        // when result is returned, set marker to new coordinates   
        setMapCenter(result);
        setLocationName(formattedAddress);

        // control input field view
        setDirections(false);
        // set hike name from db
        setSavedHike('');

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

    // clear search 
    function clearRoute() {
        searchRef.current.value = '';
        setLocationName('');
        // reset hike name from db
        setSavedHike('');
    };

    // clear directions route
    function clearDirectionsRoute() {
        setDirectionsResponse('Not found');
        setDistance('');
        setDuration('');
        originRef.current.value = '';
        destinationRef.current.value = '';
        // control input field view
        setDirections(false);
        // reset hike name from db
        setSavedHike('');
    };

    // calculate route for directions functionality
    async function calculateRoute (origin, destination, routeName) {

        // check originRef and destinationRef
        if (!originRef === undefined && !destinationRef === undefined) {

            // do not proceed to calculate if either origin or destination are not specified
            if (originRef.current.value === '' || destinationRef.current.value === '') {
                return;
            };

            // eslint-disable-next-line no-undef
            const directionsService = new google.maps.DirectionsService();
            
            try {
                const newRoute = await directionsService.route({
                    origin: originRef.current.value,
                    destination: destinationRef.current.value,
                    // 'walking' mode suits best for hiking
                    travelMode: google.maps.TravelMode.WALKING
                });
                setResultDirectionsService(newRoute);
            } catch (err) {
                setResultDirectionsService(null);
                setDirectionsResponse(null);
                console.error(err);
            }

            // console.log(resultDirectionsService);
            if(resultDirectionsService){
                setDirectionsResponse(resultDirectionsService);
                setDistance(resultDirectionsService.routes[0].legs[0].distance.text);
                setDuration(resultDirectionsService.routes[0].legs[0].duration.text);
            } else {
                return;
            };

        } else {

             // eslint-disable-next-line no-undef
             const directionsService = new google.maps.DirectionsService();

             try {
                const newRoute = await directionsService.route({
                    origin: origin,
                    destination: destination,
                    // 'walking' mode suits best for hiking
                    travelMode: google.maps.TravelMode.WALKING
                });
                setResultDirectionsService(newRoute);
            } catch (err) {
                setResultDirectionsService(null);
                setDirectionsResponse(null);
                console.error(err);
            }

            // console.log(resultDirectionsService);
            if(resultDirectionsService){
                setDirectionsResponse(resultDirectionsService);
                setDistance(resultDirectionsService.routes[0].legs[0].distance.text);
                setDuration(resultDirectionsService.routes[0].legs[0].duration.text);
                // control input field view
                setDirections(true);
                // set hike name from db
                setSavedHike(routeName);
            } else {
                return;
            };
        };

    };

    return (
            <div className='map-wrapper-main'>
                <div className='sidebar-wrapper'>
                    <Sidebar 
                        setMapCenter={setMapCenter} 
                        setLocationName={setLocationName}
                        setHikeId={setHikeId}
                        calculateRoute={calculateRoute}
                        setDirections={setDirections}
                        setSavedHike={setSavedHike}
                    />  
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
                                        // draggable={true}
                                        // onMouseUp={detectLocation}
                                        onClick={InfoWindowF}
                                    >
                                        <InfoWindowF
                                            position={mapCenter}
                                        >
                                            <>{locationName}</>
                                        </InfoWindowF>
                                    </MarkerF>
                                    {/* display directions results */}
                                    {directionsResponse && 
                                        <DirectionsRenderer 
                                            directions={directionsResponse}
                                        />
                                    }
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
                                    {!directions &&
                                        <Autocomplete>
                                            <Input 
                                                type='text' 
                                                placeholder='Search Your Destination'
                                                ref={searchRef}
                                                onKeyUp={keyPress}
                                            />
                                        </Autocomplete>
                                    }
                                    {directions &&
                                        <Autocomplete>
                                           <Input 
                                               type='text' 
                                               placeholder='Origin' 
                                               ref={originRef}
                                               onKeyUp={keyPress}
                                               mt={2}
                                           />
                                       </Autocomplete>
                                    }
                                    {directions &&
                                        <Autocomplete>
                                           <Input 
                                               type='text' 
                                               placeholder='Destination' 
                                               ref={destinationRef}
                                               onKeyUp={keyPress}
                                               mt={2}
                                           />
                                       </Autocomplete>
                                    }
                                </Box> 
                                <ButtonGroup>
                                    <Flex
                                        flexDirection={directions ? 'column' : 'row'}

                                    >
                                        {directions ? 
                                            <Button 
                                                bg='primary.main' 
                                                color='primary.txt'
                                                _hover={{bg: 'primary.save', color: 'primary.txt'}}
                                                type='submit' 
                                                onClick={calculateRoute}
                                            >
                                                Calculate Route
                                            </Button>
                                        :
                                            <Button 
                                                bg='primary.main' 
                                                color='primary.txt'
                                                _hover={{bg: 'primary.save', color: 'primary.txt'}}
                                                type='submit' 
                                                onClick={searchLocation}
                                            >
                                                Search
                                            </Button>
                                        }
                                        {!directions && 
                                            <Button 
                                                bg='primary.main' 
                                                color='primary.txt'
                                                _hover={{bg: 'primary.save', color: 'primary.txt'}}
                                                type='submit' 
                                                onClick={() => setDirections(true)}
                                                ml={2}
                                            >
                                                Get Directions
                                            </Button>
                                        }
            
                                        {directions ?
                                            <Button 
                                                bg='primary.main' 
                                                color='primary.txt'
                                                _hover={{bg: 'primary.save', color: 'primary.txt'}}
                                                type='submit' 
                                                onClick={saveRouteHandler}
                                                mt={2}
                                            >
                                                Save Hike Route
                                            </Button>
                                            :
                                            <Button 
                                            bg='primary.main' 
                                            color='primary.txt'
                                            _hover={{bg: 'primary.save', color: 'primary.txt'}}
                                            type='submit' 
                                            onClick={() => saveHikeHandler(mapCenter, locationName)}
                                            ml={2}
                                        >
                                            Save Destination
                                        </Button>
                                        }
                                    </Flex>
                                </ButtonGroup>
                                </HStack>
                                
                                {/* HIKE TITLE ADDED WHEN HIKE ROUTE SEARCHED FROM SAVED HIKE NOT INPUT */}
                                <HStack>
                                    {savedHike && 
                                        <Text mt={4} ml={1}>
                                            Current Hike:
                                                <Text  as='i'> {savedHike}</Text>
                                        </Text>
                                    }
                                </HStack>
                                
                                <HStack justifyContent='space-between'>
                                    {directions ? 
                                        <Text mt={4} ml={1}>
                                            Distance:
                                        <Text  as='i'> {distance}</Text>
                                        </Text>
                                    :
                                        <Text mt={4} ml={1}>
                                            Current Location:
                                            <Text  as='i'> {locationName}</Text>
                                        </Text>
                                    }
                                {directions && 
                                    <Text mt={4} ml={1}>
                                        Duration:
                                        <Text  as='i'> {duration}</Text>
                                    </Text>
                                }
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
                                        onClick={directions ? clearDirectionsRoute : clearRoute}
                                        />
                                        
                                    </HStack>
                                </HStack>
                                {error &&
                                    <Text mt={4} ml={1} color='#cc0000'>
                                        Unable to save hike, please search your destination first.
                                    </Text>
                                }
                                {resultDirectionsService === 'Not found' &&
                                    <Text mt={4} ml={1} color='#cc0000'>
                                        Unable to find route between provided destinations.
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
