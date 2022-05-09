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
  console.log(req.body.action)
  if (req.body.action === 'add') {
    let payload = JSON.parse(req.body.payload)
    let locationName = payload.locationName
    let latitude = payload.latitude
    let longitude = payload.longitude
    let weatherData = payload.weatherData
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
  }
}