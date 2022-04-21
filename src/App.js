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
    <div className="weatherApp">
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter zip"
            className="locationInput"
          />
          <button className="searchButton" onClick={ifClicked}>
            Search Location
          </button>
        </div>

        <div className="app__data">
          <p className="temperature">
            Current Temperature: {Math.round(weather?.main?.temp)}°F
          </p>

          <p className="citySearch">City: {weather?.name}</p>
          <p className="tempHighLow">
            Current: High: {Math.round(weather?.main?.temp_max)}°F / Low:{" "}
            {Math.round(weather?.main?.temp_min)}°F
          </p>

          <p className="currentCondition">
            Conditions: {weather?.weather?.[0]?.description}
          </p>

          <p className="moisture">Humidity: {weather?.main?.humidity}%</p>

          <p className="feelsLike">
            Feels like: {Math.round(weather?.main?.feels_like)}°F
          </p>

          <p className="currentDate"> Current Date & Time: {usDate}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
