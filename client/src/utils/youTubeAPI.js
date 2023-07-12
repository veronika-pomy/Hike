// make request to YT API

export const searchVideoYT = () => {
    return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCDLWkvdzTe9hARN3phcISmg&maxResults=1&order=date&key=${process.env.REACT_APP_YT_API_KEY}`)
    .then((result) => {
        return result.json();
    });
};