import React, { useEffect } from 'react';
import WeatherItem from '../components/WeatherItem';

import { faSun, faCloud, faSnowflake, faCloudRain, faBolt, faSmog, faCloudShowersHeavy, faCloudSun } from '@fortawesome/free-solid-svg-icons';

function Weather({lat, lng, location, close, setClose, getWeatherData, weatherData, setWeatherData}) {

  // close weather componenet on click
  const weatherHandlerClose = () => {
    setClose(true);
  };

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

  console.log(weatherData);

  // get data from the default location to start, runs once on load
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

  return (
    !close ? 
      <>
        <div className='weather-container'>
          <div className='weather-content-wrapper'>
            <p className='weather-close-btn'>
              <button
                onClick={() => weatherHandlerClose()}
              >
                close
              </button>
            </p>
            <p className='weather-title'>Weather Forecast for {location} </p>
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
      </>
       : 
      <> 
      </>
  );
};

export default Weather;
