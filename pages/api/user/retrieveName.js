// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

import mongoose from 'mongoose'
import connectToMongoDB from '../../../backend/mongo/mongoDB'
import userModel from '../../../backend/dbSchema/userSchema'
import APICHECK from '../APICHECK'

export default async function handler(req, res) {
  let err
  if (err = APICHECK.POST_only(req), err)
    return res.status(err.httpStatus).json(err.apiRes)

  if (err = APICHECK.PARAMS_REQUIRE(req, ['uid']), err)
    return res.status(err.httpStatus).json(err.apiRes)

  await connectToMongoDB()
  const db = mongoose.connection
  const User = userModel
  let uid = req.body.uid
  if (uid === undefined)
    return res.status(400).json({ status: 'error', msg: 'Some field is empty' })

  User.findOne({ _id: uid }, (err, user) => {
    if (err) return res.status(400).json({ status: 'error', msg: err })
    if (user == null) {
      return res.status(404).json({ status: '404', msg: 'Username does not exist' })
    }
    const username = user.username
    const userPW = user.password
    const userSALT = user.salt
    return res.status(200).json({ username: username })

  });

}