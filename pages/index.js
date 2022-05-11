import React, { useState, useEffect } from 'react'
import Link from 'next/link';

import fetchWeatherAPI from '../backend/dataFetch/fetchAPI'

const hardcodedData = [{
  "location": {
    "name": "Hong Kong",
    "region": "",
    "country": "Hong Kong",
    "lat": 22.28,
    "lon": 114.15,
    "tz_id": "Asia/Hong_Kong",
    "localtime_epoch": 1652260480,
    "localtime": "2022-05-11 17:14"
  },
  "current": {
    "last_updated_epoch": 1652256000,
    "last_updated": "2022-05-11 16:00",
    "temp_c": 25,
    "temp_f": 77,
    "is_day": 1,
    "condition": {
      "text": "Moderate rain",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/302.png",
      "code": 1189
    },
    "wind_mph": 13.6,
    "wind_kph": 22,
    "wind_degree": 160,
    "wind_dir": "SSE",
    "pressure_mb": 1006,
    "pressure_in": 29.71,
    "precip_mm": 0.4,
    "precip_in": 0.02,
    "humidity": 89,
    "cloud": 75,
    "feelslike_c": 27.9,
    "feelslike_f": 82.1,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 5,
    "gust_mph": 14.3,
    "gust_kph": 23
  }
},
{
  "location": {
    "name": "London",
    "region": "City of London, Greater London",
    "country": "United Kingdom",
    "lat": 51.52,
    "lon": -0.11,
    "tz_id": "Europe/London",
    "localtime_epoch": 1652261975,
    "localtime": "2022-05-11 10:39"
  },
  "current": {
    "last_updated_epoch": 1652260500,
    "last_updated": "2022-05-11 10:15",
    "temp_c": 15,
    "temp_f": 59,
    "is_day": 1,
    "condition": {
      "text": "Overcast",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/122.png",
      "code": 1009
    },
    "wind_mph": 15,
    "wind_kph": 24.1,
    "wind_degree": 220,
    "wind_dir": "SW",
    "pressure_mb": 1009,
    "pressure_in": 29.8,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 63,
    "cloud": 75,
    "feelslike_c": 13.5,
    "feelslike_f": 56.3,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 4,
    "gust_mph": 16.6,
    "gust_kph": 26.6
  }
}

]

function HomePage() {
  const [weatherData, setWeatherData] = useState([])
  const [order, setOrder] = useState(true) // true: ascending, false: descending

  useEffect(() => {
    // Fetch weather data from API to weatherData state
    setWeatherData(hardcodedData) // Meaning is : weatherData = hardcodedData
  }, [])

  useEffect(() => {
    // When weatherData changed its value, then will execute this function
    console.log(weatherData)
  }, [weatherData])

  // useEffect(() => {
  //   fetchWeatherAPI({ location: 'Hong Kong' }).then(data =>
  //     setWeatherData(data.data))
  // }, [])

  // function getWeatherData(e) {
  //   fetchWeatherAPI({ location: e.target.value }).then(data =>
  //     setWeatherData(data.data))
  // }

  // return <div>
  //   <label>Location: </label>
  //   <input type="text" id="weatherLocation" onChange={getWeatherData}></input>
  //   <div>
  //     Weather Data: {JSON.stringify(weatherData)}
  //   </div>
  // </div>
// onclick function
  function sortByLatitude() {
    // When Latitude title is clicked
    if (order == true){
      setOrder(false)
    } else 
    if (order == false){
      setOrder(true)
    }
  }

  if (weatherData.length == 0) return <div></div>

  // HTML + JS section
  return (
    <>
    <div className="w-full">
      <table className="table-auto w-full">
    <thead>
      <tr>
        <th>Location</th>
        <th onClick={sortByLatitude}>Latitude</th>
        <th>Longitude</th>
      </tr>
    </thead>
    <tbody>
      {
        weatherData.sort(function(a, b){if (order) {return a.location.lat - b.location.lat} else {return b.location.lat - a.location.lat}}).map((location, index) => (
          <tr key={index}>
            <td> <Link href={`/location/${weatherData[index].location.name.replace(/\s/g, '')}`}>{weatherData[index].location.name}</Link></td>
            <td>{weatherData[index].location.lat}</td>
            <td>{weatherData[index].location.lon}</td>
          </tr>
        ))
      }
        </tbody>
    </table>
  </div>
  </>
  )
}

export default HomePage