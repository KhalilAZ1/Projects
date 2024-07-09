import React from 'react'

export default function WeatherInfos(props) {
    const {data, unit} = props

    if(data.location === undefined) {
        return <></>
    }

    let day = ""

    if(data.is_day) {
        day = "day"
    } else {
        day = "night"
    }

    let tempUnit = "°C"
    let speedUnit = "km/h"
    let pressureUnit = "millibar"
    let precipitationUnit = "millimeters"

    if(unit === "f") {
        tempUnit = "°F"
        speedUnit = "mph"
        precipitationUnit = "inches"
    } else if(data.current.temperature_unit === "fahrenheit") {
        tempUnit = "°K" 
    }

    return (
        <>
            <br></br>
            <div>city : {data.location.name}, {data.location.country}</div>
            <div>latitude : {data.location.lat}° &nbsp;&nbsp;&nbsp; longitude : {data.location.lon}°</div>
            <div>observation time : {data.current.observation_time} and it is {day}</div>
            <div>temperature : {data.current.temperature} {tempUnit}</div>
            <div>feels like : {data.current.feelslike} {tempUnit}</div>
            <div>weather description : {data.current.weather_descriptions[0]} <img src={data.current.weather_icons[0]} alt="Weather Icon" width="15" height="15" /> </div>
            <div>humidity : {data.current.humidity} %</div>
            <div>wind speed : {data.current.wind_speed} {speedUnit}</div>
            <div>pressure : {data.current.pressure} {pressureUnit}</div>
            <div>precipitation : {data.current.precip} {precipitationUnit}</div>
            <div>uv index : {data.current.uv_index}</div>
            <div>visibility : {data.current.visibility}</div>
        </>
    )
}