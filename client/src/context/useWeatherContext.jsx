import React, { useState, useContext } from 'react';

export const WeatherContext = React.createContext();

export const useWeatherContext = () => useContext(WeatherContext);

export default function WeatherProvider ({children}) {
    const [ weather, setWeather] = useState(false);

    //method to update weather component state 
    const toggleWeather = () => {
        return setWeather((prev) => !prev);
    };

    return (
        <WeatherContext.Provider value={{ weather, setWeather, toggleWeather }}>
            {children}
        </WeatherContext.Provider>
    );
};