import mongoose from 'mongoose'
import connectToMongoDB from '../../backend/mongo/mongoDB'
import userModel from '../../backend/dbSchema/userSchema'
import APICHECK from './APICHECK'

export default async function handler(req, res) {
  let err
  if (err = APICHECK.POST_only(req), err)
    return res.status(err.httpStatus).json(err.apiRes)

  if (err = APICHECK.PARAMS_REQUIRE(req, ['action', 'payload']), err)
    return res.status(err.httpStatus).json(err.apiRes)

  connectToMongoDB()
  const db = mongoose.connection
  const User = userModel
  let username, lid
  switch (req.body.action) {
    case 'add':
      ({ username, lid } = req.body.payload);
      if ([username, lid].includes(undefined) || [username, lid].includes(null))
        return res.status(400).json({ status: 'error', msg: 'Payload data contains empty field' })
      User.findOneAndUpdate(
        { username },
        { $push: { favLoc: { lid } } },
        (e) => {
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json({ status: '200', msg: 'Favorite location added' })
        }
      )
      break
    case 'get':
      if (req.body.payload === 'all') {
        User.find({}, "favLoc", (e, allFavLoc) => {
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json(allFavLoc)
        })
      }
      else {
        User.findOne({ username: req.body.payload }, "favLoc", (e, favLoc) => {
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json(favLoc)
        })
      }
      break
    case 'delete':
      ({ username, lid } = req.body.payload);
      if ([username, lid].includes(undefined) || [username, lid].includes(null))
        return res.status(400).json({ status: 'error', msg: 'Payload data contains empty field' })
      User.findOneAndUpdate(
        { username },
        { $pull: { favLoc: { lid } } },
        (e) => {
          if (e) return res.status(400).json({ status: 'error', msg: e })
          return res.status(200).json({ status: '200', msg: 'Favorite location removed' })
        }
      )
  }
}