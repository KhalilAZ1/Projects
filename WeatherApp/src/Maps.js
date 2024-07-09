import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getWeather } from "openweathermap-js";

const Map = () => {
    const [weather, setWeather] = useState([]);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [zoom, setZoom] = useState(2);

    useEffect(() => {
        const fetchData = async () => {
          const cities = ["London", "New York", "Tokyo"];
          const api_key = "9af7dac4bb545feb716fe4a6783516bc";
          const promises = cities.map((city) => getWeather({ q: city, appid: api_key }));
          const results = await Promise.all(promises);
          setWeather(results);
        };
    
        fetchData();
      }, []);
    
      const renderMarkers = () =>
      weather.map((city) => (
        <Marker position={[city.coord.lat, city.coord.lon]} key={city.id}>
          <Popup>{`${city.name}: ${city.weather[0].description}`}</Popup>
        </Marker>
      ));

      return (
        <MapContainer center={center} zoom={zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {renderMarkers()}
        </MapContainer>
      )
}
    
export default Map;
