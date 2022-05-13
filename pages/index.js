import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Table from '../component/Table.js';
import Map from '../component/Map.js';
import fetchWeatherAPI from '../backend/dataFetch/fetchAPI'

import {getSession, useSession} from 'next-auth/react'
import Router from "next/router";

// const hardcodedData = [{
//   "location": {
//     "name": "Hong Kong",
//     "region": "",
//     "country": "Hong Kong",
//     "lat": 22.28,
//     "lon": 114.15,
//     "tz_id": "Asia/Hong_Kong",
//     "localtime_epoch": 1652260480,
//     "localtime": "2022-05-11 17:14"
//   },
//   "current": {
//     "last_updated_epoch": 1652256000,
//     "last_updated": "2022-05-11 16:00",
//     "temp_c": 25,
//     "temp_f": 77,
//     "is_day": 1,
//     "condition": {
//       "text": "Moderate rain",
//       "icon": "//cdn.weatherapi.com/weather/64x64/day/302.png",
//       "code": 1189
//     },
//     "wind_mph": 13.6,
//     "wind_kph": 22,
//     "wind_degree": 160,
//     "wind_dir": "SSE",
//     "pressure_mb": 1006,
//     "pressure_in": 29.71,
//     "precip_mm": 0.4,
//     "precip_in": 0.02,
//     "humidity": 89,
//     "cloud": 75,
//     "feelslike_c": 27.9,
//     "feelslike_f": 82.1,
//     "vis_km": 10,
//     "vis_miles": 6,
//     "uv": 5,
//     "gust_mph": 14.3,
//     "gust_kph": 23
//   }
// },
// {
//   "location": {
//     "name": "London",
//     "region": "City of London, Greater London",
//     "country": "United Kingdom",
//     "lat": 51.52,
//     "lon": -0.11,
//     "tz_id": "Europe/London",
//     "localtime_epoch": 1652261975,
//     "localtime": "2022-05-11 10:39"
//   },
//   "current": {
//     "last_updated_epoch": 1652260500,
//     "last_updated": "2022-05-11 10:15",
//     "temp_c": 15,
//     "temp_f": 59,
//     "is_day": 1,
//     "condition": {
//       "text": "Overcast",
//       "icon": "//cdn.weatherapi.com/weather/64x64/day/122.png",
//       "code": 1009
//     },
//     "wind_mph": 15,
//     "wind_kph": 24.1,
//     "wind_degree": 220,
//     "wind_dir": "SW",
//     "pressure_mb": 1009,
//     "pressure_in": 29.8,
//     "precip_mm": 0,
//     "precip_in": 0,
//     "humidity": 63,
//     "cloud": 75,
//     "feelslike_c": 13.5,
//     "feelslike_f": 56.3,
//     "vis_km": 10,
//     "vis_miles": 6,
//     "uv": 4,
//     "gust_mph": 16.6,
//     "gust_kph": 26.6
//   }
// }

// ]

const hardcodedData = [
  {
    "lid": 0,
    "locationName": "Hong Kong",
    "locationData": {
      "name": "Hong Kong",
      "latitude": 22.28,
      "longitude": 114.15,
    }
  },
  {
    "lid": 1,
    "locationName": "London",
    "locationData": {
      "name": "London",
      "latitude": 51.52,
      "longitude": -0.11,
    }
  }
]

function HomePage() {

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/form')
    },
  })
  if (session.user.isAdmin)
    Router.push('/admin')

  if (status === "loading") {
    return <h2>Loading...</h2>
  }

  // const [loading, setLoading] = useState(true)
  //
  // useEffect(() => {
  //   const securePage = async () => {
  //     const session = await getSession()
  //     console.log(session)
  //     if (!session) {
  //       if (typeof window !== 'undefined') {
  //         await Router.push('/form')
  //       }
  //     } else {
  //       setLoading(false)
  //     }
  //   }
  //   securePage()
  // }, [])
  //
  // if (loading) {
  //   return <h2>Loading...</h2>
  // }

  const [locations, setLocations] = useState([])

  useEffect(() => {
    // Fetch weather data from API to locations state
    setLocations(hardcodedData) // Meaning is : locations = hardcodedData
  }, [])

  useEffect(() => {
    // When locations changed its value, then will execute this function
    console.log(locations)
  }, [locations])

  if (locations.length === 0) return <div></div>

  // HTML + JS section
  return (
    <>
    <Map locations={locations}/>
    <Table locations={locations} />
  </>
  )
}

export default HomePage