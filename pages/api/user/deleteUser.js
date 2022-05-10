import mongoose from 'mongoose'
import connectToMongoDB from '../../../backend/mongo/mongoDB'
import userModel from '../../../backend/dbSchema/userSchema'
import APICHECK from '../APICHECK'

export default async function handler(req, res) {
    let err
    if (err = APICHECK.POST_only(req), err)
        return res.status(err.httpStatus).json(err.apiRes)

    if (err = APICHECK.PARAMS_REQUIRE(req, ['username']), err)
        return res.status(err.httpStatus).json(err.apiRes)

    connectToMongoDB()
    const db = mongoose.connection
    const User = userModel
    let username = req.body.username
    if (username === undefined)
        return res.status(400).json({ status: 'error', msg: 'Some field is empty' })

    User.deleteOne({username: username}, (err, user) => {
        if (err) return res.status(400).json({ status: 'error', msg: err })

        if (user.deletedCount <= 0) {
            return res.status(404).json({ status: '404', msg: 'Username does not exist' })
        }
        return res.status(200).json({ status: '200', msg: 'User deleted' })
    })
}