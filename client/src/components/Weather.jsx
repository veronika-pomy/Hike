import React, { useState, useEffect } from 'react';
import WeatherItem from '../components/WeatherItem';

import { useWeatherContext } from '../context/useWeatherContext';

import { Card, CardBody, CardHeader, Text, Heading, Icon, Container } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faSnowflake, faCloudRain, faBolt, faSmog, faCloudShowersHeavy, faCloudSun } from '@fortawesome/free-solid-svg-icons';

import { fetchWeather } from '../utils//weatherAPI';

function Weather({lat, lng}) {

  // determine which icon to use based on main weather description 
  const determineIcon = (weatherDescription) => {
    switch (weatherDescription) {
      case ('Thunderstorm'):
        return faBolt;
      case('Drizzle'): 
        return faCloudRain;
      case ('Rain'):
        return faCloudShowersHeavy;
      case ('Snow'):
        return faSnowflake;
      case ('Clear'):
        return faSun;
      case ('Clouds'):
        return faCloud;
      case ('Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Fog' || 'Sand' || 'Dust' || 'Ash' || 'Squall' || 'Tornado'):
        return faSmog;
      default:
        return faCloudSun;
    };
  };

  // change weather based on users choice 
  const { weather } = useWeatherContext();

  // state for holding returned api data
  const [ weatherData, setWeatherData ] = useState({});

  //method to call weather api to render data in the weather component on 
  const getWeatherData = async (lat, lng) => {
    try {
      const response = await fetchWeather(lat, lng);
      // console.log(response);

      if (!response.ok) {
          throw new Error('Something went wrong with fetching weather data.');
      };

      const weatherResponse = await response.json();
      // console.log(weatherResponse.daily[0].weather);
      return weatherResponse;
    } catch (err) {
        console.error(err);
    };
  };

  useEffect(() => {
    async function resolveWeatherPromise () {
      try {
        const weatherSetData = await getWeatherData(lat, lng);
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
              <div className='weather-items'>
                  {weatherData.daily.map((item) => {
                    return (
                      <WeatherItem
                        date={item.dt}
                        icon={
                          determineIcon(item.weather[0].main)
                        } 
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
