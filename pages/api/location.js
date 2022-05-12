import mongoose from 'mongoose'
import connectToMongoDB from '../../backend/mongo/mongoDB'
import locModel from '../../backend/dbSchema/locationsSchema'
import APICHECK from './APICHECK'

export default async function handler(req, res) {
  let err
  if (err = APICHECK.POST_only(req), err)
    return res.status(err.httpStatus).json(err.apiRes)

  if (err = APICHECK.PARAMS_REQUIRE(req, ['action', 'payload']), err)
    return res.status(err.httpStatus).json(err.apiRes)

  connectToMongoDB()
  const db = mongoose.connection
  const Location = locModel
  let payload
  let locationName
  let latitude
  let longitude
  let weatherData
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
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json(locations)
        })
      }
      else {
        Location.findOne({ locName: req.body.payload }, "locData weatherData", (e, location) => {
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
      if (locationName === undefined || latitude === undefined || longitude === undefined || weatherData === undefined)
        return res.status(400).json({ status: 'error', msg: 'Payload data contains empty field' })
      Location.findOneAndUpdate({ locName: locationName },
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
      Location.deleteOne({ locName: req.body.payload }, (e, location) => {
        if (e) return res.status(400).json({ status: 'error', msg: e })
        return res.status(200).json(location)
      })
  }
}