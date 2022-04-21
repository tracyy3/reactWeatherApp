import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const today = new Date();
  const [weather, setWeather] = useState({});
  const [zip, setZip] = useState("28217");
  const [photos, setPhotos] = useState([]);
  let usDate = today.toLocaleString("en-US", { timeZone: "America/New_York" });
  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=c237510cf91410feb66c6741d1a4860c&units=imperial`
    )
      .then((response) => {
        if (response.ok) {
          console.log(response.status);
          return response.json();
        } else {
          if (response.status === 404) {
          }

          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter zip"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">
            Current Temperature: {Math.round(weather?.main?.temp)}°F
          </p>
          <p className="city">Current City: {weather?.name}</p>
          <p className="tempHiLo">
            Current High/Low: High: {Math.round(weather?.main?.temp_max)} °F
            Low: {Math.round(weather?.main?.temp_min)}°F
          </p>
          <p className="currentConditions">
            Current Conditions: {weather?.weather?.[0]?.description}
          </p>
          <p className="humidity">
            Current Humidity: {weather?.main?.humidity}%
          </p>
          <p className="feelsLike">
            Feels like: {Math.round(weather?.main?.feels_like)}°F
          </p>
          <p className="currentDate"> Current Date & Time: {usDate}</p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;
