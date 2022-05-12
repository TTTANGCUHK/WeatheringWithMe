import mongoose from 'mongoose'
import connectToMongoDB from '../../backend/mongo/mongoDB'
import locModel from '../../backend/dbSchema/locationsSchema'
import APICHECK from './APICHECK'

export default async function handler(req, res) {
  console.log("action is", req.body.action)
  console.log("payload is", req.body.payload)
  let err
  if (err = APICHECK.POST_only(req), err)
    return res.status(err.httpStatus).json(err.apiRes)

  if (err = APICHECK.PARAMS_REQUIRE(req, ['action', 'payload']), err)
    return res.status(err.httpStatus).json(err.apiRes)

  connectToMongoDB()
  const db = mongoose.connection
  const Location = locModel
  switch (req.body.action) {
    case 'add':
      const { locName, uid, body } = JSON.parse(req.body.payload);
      if ([locName, uid, body].includes(undefined) || [locName, uid, body].includes(null) || body.length === 0)
        return res.status(400).json({ status: 'error', msg: 'Payload data contains empty field' })
      Location.findOneAndUpdate(
        { locName },
        { $push: { comments: { uid, body } } },
        (e) => {
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json({ status: '200', msg: 'Comment added' })
        }
      )
      break
    case 'get':
      if (req.body.payload === 'all') {
        Location.find({}, "comments", (e, allComments) => {
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json(allComments)
        })
      }
      else {
        Location.findOne({ locName: req.body.payload }, "comments", (e, comments) => {
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json(comments)
        })
      }
  }
}