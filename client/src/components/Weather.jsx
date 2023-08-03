import React, { useState, useEffect } from 'react';
import WeatherItem from '../components/WeatherItem';

import { useWeatherContext } from '../context/useWeatherContext';

import { Card, CardBody, CardHeader, Text, Heading, Icon, Container } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faSnowflake, faCloudRain, faBolt, faSmog, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

import { fetchWeather } from '../utils//weatherAPI';

function Weather() {

  // date, time data, icons
  const weekDays = [ '', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
  const weatherIcons = [ faSun, faCloud, faSnowflake, faCloudRain, faBolt, faSmog, faCloudShowersHeavy ];

  let time;
  let hour;
  let minutes;

  const [ timeData, setTimeData ] = useState({
    month: '',
    date: '',
    day: '',
    hour: '',
    minutes: '',
    hour12: '',
    ampm: '',
    min: '',
  });

  useEffect(() => {
    setInterval(() => {

      time = new Date();
      hour =  time.getHours();

      setTimeData({
        month: time.getMonth(),
        date: time.getDate(),
        day: time.getDay(),
        hour: time.getHours(),
        minutes: time.getMinutes(),
        hour12: hour >= 13 ? hour%12: hour,
        ampm: hour >= 12 ? 'pm' : 'am',
        // min: minutes < 10? '0' : '' + minutes,
      });
    }, 1000);
  }, []);

  // change weather based on users choice 
  const { weather } = useWeatherContext();

    // state for holding returned api data
  const [ weatherData, setWeatherData ] = useState({});

    //method to call weather api to render data in the weather component on 
  const getWeatherData = async (weather) => {
    try {
      const response = await fetchWeather();
      // console.log(response);

      if (!response.ok) {
          throw new Error('Something went wrong with fetching weather data.');
      };

      const weatherResponse = await response.json();
      console.log(weatherResponse);
      return weatherResponse;
    } catch (err) {
        console.error(err);
    };
  };

  useEffect(() => {
    async function resolveWeatherPromise () {
      try {
        const weatherSetData = await getWeatherData(weather);
        setWeatherData(weatherSetData);
      } catch (err) {
        console.error(err);
      };
    };
    resolveWeatherPromise();
  }, []);

// TODO: add an X component to close the weather popup from the component, not sidebar
//TODO: render weather icon conditionaly

  return (
    weather ? 
      <>
        <div className='weather-container'>
          <div className='weather-content-wrapper'>
            <p className='weather-title'>Weather Forecast</p>
            <div className='weather-items-wrapper'>
              <Card className='weather-item-today' align='center' size='sm' bg='none' border='1px' borderColor='primary.txt' borderRadius='md'>
                  <CardHeader>
                    <Heading size='md' color='primary.txt'>
                      {weekDays[timeData.day] + ', ' + timeData.date + ' ' + months[timeData.month]}
                    </Heading>
                  </CardHeader>
                    <CardBody color='primary.txt'>
                      <Container align='center'pb={5} >
                      <Text color='primary.txt' pb={5} fontSize='md'>
                        {timeData.hour12 + ':' + timeData.minutes + ' ' +timeData.ampm}
                      </Text>
                      <Icon boxSize='30px' >
                        <FontAwesomeIcon icon={faSun} />
                      </Icon>
                      </Container>
                      <Container fontSize='lg'>
                        <Text>
                          Temp: {weatherData.current.temp} °F
                        </Text>
                        <Text>
                          Wind: {weatherData.current.wind_speed} mph
                        </Text>
                        <Text>
                          Humidity: {weatherData.current.humidity} %
                        </Text>
                      </Container>
                  </CardBody>
              </Card>
              <div className='weather-items'>
                  {weatherData.daily.map((item) => {
                    return (
                      <WeatherItem
                        icon={faSun} 
                        temp={item.temp.day}
                        wind={item.wind_speed}
                        humidity={item.humidity}
                      />
                    )
                  })
                }
              </div>
            </div>
        </div>
      </div>
      </> : 
      <> 
      </>)
}

export default Weather;
