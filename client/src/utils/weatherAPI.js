const key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const fetchWeather = (lat, lng) => {
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&units=imperial&appid=${key}`);
};