import mongoose from 'mongoose'
import connectToMongoDB from '../../backend/mongo/mongoDB'
import locModel from '../../backend/dbSchema/locationsSchema'
import APICHECK from './APICHECK'
import axios from 'axios'
import fetchWeatherAPI from '../../backend/dataFetch/fetchAPI'

export default async function handler(req, res) {
  let err
  if (err = APICHECK.POST_only(req), err)
    return res.status(err.httpStatus).json(err.apiRes)

  if (err = APICHECK.PARAMS_REQUIRE(req, ['action', 'payload']), err)
    return res.status(err.httpStatus).json(err.apiRes)

  await connectToMongoDB()
  const db = mongoose.connection
  const Location = locModel
  let payload
  let locationName
  let latitude
  let longitude
  let weatherData
  let _id
  switch (req.body.action) {
    case 'add':
      payload = JSON.parse(req.body.payload)
      locationName = payload.locationName
      latitude = payload.latitude
      longitude = payload.longitude
      weatherData = payload.weatherData
      if (locationName === undefined || latitude === undefined || longitude === undefined || weatherData === undefined)
        return res.status(400).json({ status: 'error', msg: 'Payload data contains empty field' })
      let newLocation = new Location({
        locName: locationName,
        locData: {
          name: locationName,
          latitude: latitude,
          longitude: longitude
        },
        weatherData: weatherData
      })
      newLocation.save((e, book) => {
        if (e) return res.status(400).json({ status: 'error', msg: e })
        return res.status(200).json({ status: '200', msg: 'Location created' })
      })
      break
    case 'get':
      if (req.body.payload === 'all') {
        Location.find({}, "locData weatherData", (e, locations) => {
          console.log(e, locations)
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json(locations)
        })
      }
      else {
        Location.findById(req.body.payload, "locData weatherData updatedAt", (e, location) => {
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json(location)
        })
      }
      break
    case 'update':
      payload = JSON.parse(req.body.payload)
      locationName = payload.locationName
      latitude = payload.latitude
      longitude = payload.longitude
      weatherData = payload.weatherData
      _id = payload._id
      if (locationName === undefined || latitude === undefined || longitude === undefined || weatherData === undefined || _id === undefined)
        return res.status(400).json({ status: 'error', msg: 'Payload data contains empty field' })
      Location.findOneAndUpdate({ _id: _id },
        {
          locName: locationName,
          locData: {
            name: locationName,
            latitude: latitude,
            longitude: longitude
          },
          weatherData: weatherData
        }, (e, location) => {
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json(location)
        })

      break
    case 'delete':
      if (req.body.payload === undefined)
        return res.status(400).json({ status: 'error', msg: 'Payload data contains empty field' })
      Location.deleteOne({ _id: req.body.payload }, (e, location) => {
        if (e || location.deletedCount == 0) return res.status(400).json({ status: 'error', msg: 'Failed to delete location' })
        return res.status(200).json(location)
      })
      break
    case 'updateAll':
      Location.find({}, "_id locData", (e, Locations) => {
        console.log("Hello?", Locations)
        Locations.forEach(async loc => {
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          await sleep(1000)
          fetchWeatherAPI({ lat: loc.locData.latitude, lon: loc.locData.longitude }).then(data => {
            Location.findOneAndUpdate({ _id: loc._id },
              {
                locData: {
                  name: data.data.location.name,
                  latitude: data.data.location.lat,
                  longitude: data.data.location.lon
                },
                weatherData: {
                  "temp_c": data.data.current.temp_c,
                  "wind_kph": data.data.current.wind_kph,
                  "wind_dir": data.data.current.wind_dir,
                  "humidity": data.data.current.humidity,
                  "precip_mm": data.data.current.precip_mm,
                  "vis_km": data.data.current.vis_km
                }
              })
          }
          )
        })
      })
      Location.findOne({}, "", {sort: "-updatedAt"}, (e, x) => {
        return res.status(200).json({ status: 200, msg: x.updatedAt })
      })
      break
    case 'getIdByName':
      if (req.body.payload === undefined)
        return res.status(400).json({ status: 'error', msg: 'Payload data contains empty field' })
      Location.findOne({ locName: req.body.payload }, "_id", (e, id) => {
        if (e || id == null) return res.status(400).json({ status: 'error', msg: e })
        return res.status(200).json(id)
      })
  }
}