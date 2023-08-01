const key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const fetchWeather = () => {
    return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=40.747560&lon=-74.047270&exclude=hourly,minutely&units=imperial&appid=${key}`);
};