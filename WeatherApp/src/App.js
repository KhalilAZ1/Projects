import React, { useState, useRef, useEffect } from 'react';
import WeatherInfos from './WeatherInfos';
import Map from "./Maps.js";


function App() {
  const [cityName, setCityName] = useState('')
  const [weatherData, setWeatherData] = useState({})
  const apiKey = 'be82162407405df9acdc108b796df60e'
  var apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`	
  let unit = 'm'

  function searchWeather() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(city => {
        if(city.success === false) {
          alert("Enter a valid city name")
        }
        setWeatherData(city)
      })
  }

  function handleCityName(event) {
    setCityName(event.target.value)
  }

  function handleUnit(event) {
    fetch(apiUrl + `&units=${event.target.value}`)
      .then(response => response.json())
      .then(city => {
        setWeatherData(city)
      })
    unit = event.target.value
  }

  function getLocalWeather(){
    fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => {
        var ip_address = data.ip;
        apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${ip_address}`
        fetch(apiUrl)
          .then(response =>response.json())
          .then(city => {
            setWeatherData(city)
        })
      })
    .catch(error => console.error(error));
    
    /*if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude
        console.log(latitude, longitude)
        apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`
        fetch(apiUrl)
          .then(response =>response.json())
          .then(city => {
            setWeatherData(city)
        })
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }*/
  }

  return (
    <>
      <h1>Weather</h1>
      <input type="text"  placeholder='Enter City Name' onChange={handleCityName} />
      <button onClick={searchWeather}> Search Weather </button>
      <button onClick={getLocalWeather}> Local Weather </button>
      <select onChange={handleUnit}>
        <option value="m">Metric</option>
        <option value="f">Fahrenheit</option>
        <option value="s">Scientific</option>
      </select>
      <br></br>
      <WeatherInfos data={weatherData} unit={unit}/>    
      <div>
        <Map />
      </div>
    </>
  )
}

export default App;
