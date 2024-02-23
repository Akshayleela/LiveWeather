import axios from 'axios';

const API_KEY = 'b6c17b881eac58628614ec7a05ac52df';
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // or 'imperial' for Fahrenheit
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
};

