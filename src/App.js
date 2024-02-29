
// import WeatherCard from './weathercard';
// import LocationInput from './LocationInput';
import React, { useState, useEffect } from 'react';
import { fetchWeather } from './api';
import './app.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [manualLocation, setManualLocation] = useState('');
  const [loading, setLoading] = useState(true);
  // const [backgroundImage, setBackgroundImage] = useState('');
  console.log(weatherData);
  useEffect(() => {
    const fetchData = async (latitude, longitude) => {
      const data = await fetchWeather(latitude, longitude);
      setWeatherData(data);
      setLoading(false);
      // setBackgroundImage(getBackgroundImage(data.weather[0].main)); // Set background image based on weather
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchData(latitude, longitude);
        }, (error) => {
          console.error('Error getting user location:', error);
          setLoading(false);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    // Fetch weather data based on geolocation
    getLocation();
  }, []);

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await fetchWeather(manualLocation);
    setWeatherData(data);
    setLoading(false);
    // setBackgroundImage(getBackgroundImage(data.weather[0].main)); // Set background image based on weather
  };

  function sunrise (unixTimestamp){
      // Convert Unix timestamp to milliseconds
      var milliseconds = unixTimestamp * 1000;

    // Adjust for Indian Standard Time (IST) - UTC+5:30
    var ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    var ISTMilliseconds = milliseconds + ISTOffset;

    // Calculate hours, minutes, and seconds in IST
    var ISTHours = Math.floor((ISTMilliseconds / (1000 * 60 * 60)) % 24);
    var ISTMinutes = Math.floor((ISTMilliseconds / (1000 * 60)) % 60);
    var ISTSeconds = Math.floor((ISTMilliseconds / 1000) % 60);

    // Format the result
    var formattedTime = 
        (ISTHours < 10 ? "0" : "") + ISTHours + ":" + 
        (ISTMinutes < 10 ? "0" : "") + ISTMinutes + ":" + 
        (ISTSeconds < 10 ? "0" : "") + ISTSeconds;

    return formattedTime;
  
  };
  // const getBackgroundImage = (weatherCondition) => {
  //   const currentTime = new Date().getHours(); // Get current hour (0-23)
  //   let backgroundImage = '';
  //   console.log(currentTime)
  //   if (weatherCondition && currentTime) {
  //     // Check if weatherCondition and currentTime are not null
  //     if (currentTime >= 6 && currentTime < 18) {
  //       // Daytime
  //       switch (weatherCondition) {
  //         case 'Clear':
  //           backgroundImage = 'images/day-clear.jpg'; // Daytime, clear sky
  //           break;
  //         case 'Rain':
  //           backgroundImage = 'images/day-rainy.jpg'; // Daytime, rainy
  //           break;
  //         case 'Clouds':
  //           backgroundImage = 'images/day-cloudy.jpg'; // Daytime, cloudy
  //           break;
  //         // Add more cases for other weather conditions as needed
  //         default:
  //           backgroundImage = 'images/day-default.jpg'; // Daytime, default
  //       }
  //     } else {
  //       // Nighttime
  //       switch (weatherCondition) {
  //         case 'Clear':
  //           backgroundImage = 'images/night-clear.jpg'; // Nighttime, clear sky
  //           break;
  //         case 'Rain':
  //           backgroundImage = 'images/night-rainy.jpg'; // Nighttime, rainy
  //           break;
  //         case 'Clouds':
  //           backgroundImage = 'images/night-cloudy.jpg'; // Nighttime, cloudy
  //           break;
  //         // Add more cases for other weather conditions as needed
  //         default:
  //           backgroundImage = 'images/night-default.jpg'; // Nighttime, default
  //       }
  //     }
  //   }
  //   return backgroundImage;
  // };

  return (

    <div className="app" >

      <h1>Weather App</h1>
     
      <form onSubmit={handleLocationSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {weatherData && (
            <>
              <p>Location: {weatherData.name}</p>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Pressure:{weatherData.main.pressure} mbar</p>
              <p>Weather: {weatherData.weather[0].main}</p>
              <p>Coordinates:{weatherData.coord.lon},{weatherData.coord.lat}</p>
              <p>Sunrise:{sunrise(weatherData.sys.sunrise)}</p>
              <p>Sunset:{sunrise(weatherData.sys.sunset)}</p>
            </>
          )}
        </>
      )}
    </div>

  );
};

export default App;
