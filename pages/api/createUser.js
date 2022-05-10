import mongoose from 'mongoose'
import connectToMongoDB from '../../backend/mongo/mongoDB'
import userModel from '../../backend/dbSchema/userSchema'
import APICHECK from './APICHECK'

export default async function handler(req, res) {
  let err
  if (err = APICHECK.POST_only(req), err)
    return res.status(err.httpStatus).json(err.apiRes)

  if (err = APICHECK.PARAMS_REQUIRE(req, ['username', 'salt', 'password']), err)
    return res.status(err.httpStatus).json(err.apiRes)

  connectToMongoDB()
  const db = mongoose.connection
  const User = userModel
  let username = req.body.username
  let salt = req.body.salt
  let password = req.body.password
  if (username === undefined || salt === undefined || password === undefined)
    return res.status(400).json({ status: 'error', msg: 'Some field is empty' })
  let newUser = new User({
    username: username,
    salt: salt,
    password: password,
    isAdmin: false
  })
  User.findOne({username: username}, (err, user) => {
      if (user.username === username) {
          return res.status(403).json({ status: '403', msg: 'Username exist' })
      }
  })

  newUser.save((e, user) => {
    if (e) return res.status(400).json({ status: 'error', msg: e })
    return res.status(200).json({ status: '200', msg: 'User created' })
  })
}