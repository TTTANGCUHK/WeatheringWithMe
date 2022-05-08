import React, { useState, useEffect } from 'react'
import fetchWeatherAPI from '../backend/dataFetch/fetchAPI'

function HomePage() {
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    fetchWeatherAPI({ location: 'Hong Kong' }).then(data =>
      setWeatherData(data.data))
  }, [])

  function getWeatherData(e) {
    fetchWeatherAPI({ location: e.target.value }).then(data =>
      setWeatherData(data.data))
  }

  return <div>
    <label>Location: </label>
    <input type="text" id="weatherLocation" onChange={getWeatherData}></input>
    <div>
      Weather Data: {JSON.stringify(weatherData)}
    </div>
  </div>
}

export default HomePage