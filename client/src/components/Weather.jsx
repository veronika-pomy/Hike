import React, { useState, useEffect } from 'react';
import WeatherItem from '../components/WeatherItem';

import { useWeatherContext } from '../context/useWeatherContext';

import { faSun, faCloud, faSnowflake, faCloudRain, faBolt, faSmog, faCloudShowersHeavy, faCloudSun } from '@fortawesome/free-solid-svg-icons';

import { Card, CardBody, CardHeader, Text, Heading, Icon, Container, Flex } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { fetchWeather } from '../utils//weatherAPI';

function Weather({lat, lng, location}) {

  // control weather popup from component, not side bar
  const [ close, setClose ] = useState(false);

  // close weather componenet
  const weatherHandler = () => {
    setClose(true);
  };

  // // determine which icon to use based on main weather description 
  // const determineIcon = (weatherDescription) => {
  //   switch (weatherDescription) {
  //     case ('Thunderstorm'):
  //       return faBolt;
  //     case('Drizzle'): 
  //       return faCloudRain;
  //     case ('Rain'):
  //       return faCloudShowersHeavy;
  //     case ('Snow'):
  //       return faSnowflake;
  //     case ('Clear'):
  //       return faSun;
  //     case ('Clouds'):
  //       return faCloud;
  //     case ('Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Fog' || 'Sand' || 'Dust' || 'Ash' || 'Squall' || 'Tornado'):
  //       return faSmog;
  //     default:
  //       return faCloudSun;
  //   };
  // };

  // // change weather based on users choice 
  // const { weather } = useWeatherContext();

  // // state for holding returned api data
  // const [ weatherData, setWeatherData ] = useState({});

  // console.log(weatherData);

  // //method to call weather api to render data in the weather component on 
  // const getWeatherData = async (lat, lng) => {
  //   try {
  //     const response = await fetchWeather(lat, lng);
  //     // console.log(response);

  //     if (!response.ok) {
  //         throw new Error('Something went wrong with fetching weather data.');
  //     };

  //     const weatherResponse = await response.json();
  //     // console.log(weatherResponse.daily[0].weather);
  //     return weatherResponse;
  //   } catch (err) {
  //       console.error(err);
  //   };
  // };

  // useEffect(() => {
  //   async function resolveWeatherPromise () {
  //     try {
  //       const weatherSetData = await getWeatherData(lat, lng);
  //       setWeatherData(weatherSetData);
  //     } catch (err) {
  //       console.error(err);
  //     };
  //   };
  //   resolveWeatherPromise();
  // }, []);

  return (
    // weather ? 
    !close ? 
      <>
        <div className='weather-container'>
          <div className='weather-content-wrapper'>
          <p className='weather-close-btn'>
            <button
              onClick={() => weatherHandler()}
            >
              close
            </button>
          </p>
            <p className='weather-title'>Weather Forecast for {location} </p>
            <div className='weather-items-wrapper'>
              <div className='weather-items'>
              <Card 
                className='weather-item' 
                align='center' 
                size='sm' 
                bg='none' 
                border='1px' 
                borderColor='primary.txt' 
                borderRadius='md'
              >
                <CardHeader>
                <Heading size='sm' align='center' color='primary.txt'>
                    Wed
                    <Text
                      align='center'
                    >
                      27 Sep
                    </Text>
                </Heading>
                </CardHeader>
                <CardBody color='primary.txt' className='weather-info-card'>
                    <Container align='center' pb={5} className='weather-icon'>
                    <Icon boxSize='30px'>
                    <FontAwesomeIcon icon={faCloudShowersHeavy} />
                    </Icon>
                    </Container>
                    <Container fontSize='sm' className='weather-info-box'>
                    <Flex
                      direction='column'
                      className='weather-info-container'
        
                    >
                      <Text className='weather-text'>
                        Temp: 
                      </Text>
                      <Text className='weather-text'>
                       63.16 °F
                      </Text>
                    </Flex>
                    <Text className='weather-text'>
                        Wind: 11.23 mph
                    </Text>
                    <Text className='weather-text'>
                        Humidity: 71 %
                    </Text>
                    </Container>
                </CardBody>
              </Card>
              <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                <Heading size='sm' align='center' color='primary.txt'>
                    Thu
                    <Text
                      align='center'
                    >
                      28 Sep
                    </Text>
                </Heading>
                </CardHeader>
                <CardBody color='primary.txt' className='weather-info-card'>
                    <Container align='center' pb={5} className='weather-icon'>
                    <Icon boxSize='30px'>
                    <FontAwesomeIcon icon={faCloudShowersHeavy} />
                    </Icon>
                    </Container>
                    <Container fontSize='sm' className='weather-info-box'>
                    <Text className='weather-text'>
                        Temp: 58.21 °F
                    </Text>
                    <Text className='weather-text'>
                        Wind: 8.95 mph
                    </Text>
                    <Text className='weather-text'>
                        Humidity: 75 %
                    </Text>
                    </Container>
                </CardBody>
              </Card>
              <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                <Heading size='sm' align='center' color='primary.txt'>
                    Fri
                    <Text
                      align='center'
                    >
                      29 Sep
                    </Text>
                </Heading>
                </CardHeader>
                <CardBody color='primary.txt' className='weather-info-card'>
                    <Container align='center' pb={5} className='weather-icon'>
                    <Icon boxSize='30px'>
                    <FontAwesomeIcon icon={faCloud} />
                    </Icon>
                    </Container>
                    <Container fontSize='sm' className='weather-info-box'>
                    <Text className='weather-text'>
                        Temp: 68.76 °F
                    </Text>
                    <Text className='weather-text'>
                        Wind: 6.73 mph
                    </Text>
                    <Text className='weather-text'>
                        Humidity: 65 %
                    </Text>
                    </Container>
                </CardBody>
              </Card>
              <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                <Heading size='sm' align='center' color='primary.txt'>
                    Sat 
                    <Text
                      align='center'
                    >
                      30 Sep
                    </Text>
                </Heading>
                </CardHeader>
                <CardBody color='primary.txt' className='weather-info-card'>
                    <Container align='center' pb={5} className='weather-icon'>
                    <Icon boxSize='30px'>
                    <FontAwesomeIcon icon={faCloud} />
                    </Icon>
                    </Container>
                    <Container fontSize='sm' className='weather-info-box'>
                    <Text className='weather-text'>
                        Temp: 76.82 °F
                    </Text>
                    <Text className='weather-text'>
                        Wind: 7.07 mph
                    </Text>
                    <Text className='weather-text'>
                        Humidity: 46 %
                    </Text>
                    </Container>
                </CardBody>
              </Card>
              <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                <Heading size='sm' align='center' color='primary.txt'>
                    Sun
                    <Text
                      align='center'
                    >
                      1 Oct
                    </Text>
                </Heading>
                </CardHeader>
                <CardBody color='primary.txt' className='weather-info-card'>
                    <Container align='center' pb={5} className='weather-icon'>
                    <Icon boxSize='30px'>
                    <FontAwesomeIcon icon={faCloudShowersHeavy} />
                    </Icon>
                    </Container>
                    <Container fontSize='sm' className='weather-info-box'>
                    <Text className='weather-text'>
                        Temp: 77.63 °F
                    </Text>
                    <Text className='weather-text'>
                        Wind: 6.26 mph
                    </Text>
                    <Text className='weather-text'>
                        Humidity: 69 %
                    </Text>
                    </Container>
                </CardBody>
              </Card>
              <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                <Heading size='sm' align='center' color='primary.txt'>
                    Mon
                    <Text
                      align='center'
                    >
                      2 Oct
                    </Text>
                </Heading>
                </CardHeader>
                <CardBody color='primary.txt' className='weather-info-card'>
                    <Container align='center' pb={5} className='weather-icon'>
                    <Icon boxSize='30px'>
                    <FontAwesomeIcon icon={faCloud} />
                    </Icon>
                    </Container>
                    <Container fontSize='sm' className='weather-info-box'>
                    <Text className='weather-text'>
                        Temp: 84.47 °F
                    </Text>
                    <Text className='weather-text'>
                        Wind: 9.6 mph
                    </Text>
                    <Text className='weather-text'>
                        Humidity: 41 %
                    </Text>
                    </Container>
                </CardBody>
              </Card>
              <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                <Heading size='sm' align='center' color='primary.txt'>
                    Tue
                    <Text
                      align='center'
                    >
                      3 Oct
                    </Text>
                </Heading>
                </CardHeader>
                <CardBody color='primary.txt' className='weather-info-card'>
                    <Container align='center' pb={5} className='weather-icon'>
                    <Icon boxSize='30px'>
                    <FontAwesomeIcon icon={faCloud} />
                    </Icon>
                    </Container>
                    <Container fontSize='sm' className='weather-info-box'>
                    <Text className='weather-text'>
                        Temp: 88.56 °F
                    </Text>
                    <Text className='weather-text'>
                        Wind: 10.74 mph
                    </Text>
                    <Text className='weather-text'>
                        Humidity: 29 %
                    </Text>
                    </Container>
                </CardBody>
              </Card>
              <Card className='weather-item' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                <CardHeader>
                <Heading size='sm' align='center' color='primary.txt'>
                    Wed
                    <Text
                      align='center'
                    >
                      4 Oct
                    </Text>
                </Heading>
                </CardHeader>
                <CardBody color='primary.txt' className='weather-info-card'>
                    <Container align='center' pb={5} className='weather-icon'>
                    <Icon boxSize='30px'>
                    <FontAwesomeIcon icon={faCloud} />
                    </Icon>
                    </Container>
                    <Container fontSize='sm' className='weather-info-box'>
                    <Text className='weather-text'>
                        Temp: 86.7 °F
                    </Text>
                    <Text className='weather-text'>
                        Wind: 13.27 mph
                    </Text>
                    <Text className='weather-text'>
                        Humidity: 28 %
                    </Text>
                    </Container>
                </CardBody>
              </Card>
              </div>
            </div>
        </div>
      </div>
      </>
       : 
      <> 
      </>
    );
};

export default Weather;

// {weatherData.daily.map((item) => {
//   return (
//     <WeatherItem
//       date={item.dt}
//       icon={
//         determineIcon(item.weather[0].main)
//       } 
//       temp={item.temp.day}
//       wind={item.wind_speed}
//       humidity={item.humidity}
//     />
//   )
// })
// }