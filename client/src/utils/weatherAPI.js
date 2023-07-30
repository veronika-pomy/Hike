const key = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const fetchWeather = () => {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${key}`)
        .then(result => result.json())
            .then((data) => { 
                console.log(data);
                return data;
            });
        });
};