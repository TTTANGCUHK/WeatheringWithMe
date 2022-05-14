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
import APICRYPTO from "../APICRYPTO"

export default async function handler(req, res) {
    let err
    if (err = APICHECK.POST_only(req), err)
        return res.status(err.httpStatus).json(err.apiRes)

    if (err = APICHECK.PARAMS_REQUIRE(req, ['username', 'password']), err)
        return res.status(err.httpStatus).json(err.apiRes)

    connectToMongoDB()
    const db = mongoose.connection
    const User = userModel
    let username = req.body.username
    let password = req.body.password
    if (username === undefined || password === undefined)
        return res.status(400).json({ status: 'error', msg: 'Some field is empty' })

    User.findOne({username: username}, (err, user) =>{
        if (err) return res.status(400).json({ status: 'error', msg: err })

        if (user == null) {
            return res.status(404).json({ status: '404', msg: 'Username does not exist' })
        }

        const mSalt = APICRYPTO.GEN_SALT()
        const mPw = APICRYPTO.CRYPTO_PW(password, mSalt)

        user.salt = mSalt
        user.password = mPw
        user.save()

        if (APICRYPTO.CRYPTO_PW(password, user.salt) === mPw) {
            return res.status(200).json({ status: '200', msg: 'User updated' })
        } else {
            return res.status(403).json({ status: '403', msg: 'Password not match' })
        }

    });

}