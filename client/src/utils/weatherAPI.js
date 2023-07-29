const key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const fetchWeather = () => {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitue } = success.coords;
        return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${latitude}&exclude=hourly,minutely&appid=${key}`)
        .then((result) => {
            return result.json();
        });
    });
};