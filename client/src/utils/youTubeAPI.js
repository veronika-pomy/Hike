// make request to YT API

export const searchVideoYT = () => {
    return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.REACT_APP_YT_CHANNEL_ID}&maxResults=10&order=date&key=${process.env.REACT_APP_YT_API_KEY}`)
    .then((result) => {
        return result.json();
    });
};