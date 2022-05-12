import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials"
import Router from "next/router";
import connectToMongoDB from "../../../backend/mongo/mongoDB";
import mongoose from "mongoose";
import userModel from "../../../backend/dbSchema/userSchema";
import APICRYPTO from "../APICRYPTO"

export default NextAuth({
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "username"},
                password: {label: "Password", type: "password"},
            },
            authorize: async (credentials) => {

                connectToMongoDB()
                const db = mongoose.connection
                const User = userModel

                User.findOne({username: credentials.username}, (err, user) =>{
                    if (err) {
                        console.log("ERROR:" + err)
                        // return res.status(400).json({ status: 'error', msg: err })
                    }

                    if (user == null) {
                        console.log("NO USER")
                        // return res.status(404).json({ status: '404', msg: 'Username does not exist' })
                    }

                    if (APICRYPTO.CRYPTO_PW(credentials.password, user.salt) !== user.password) {
                        console.log("WRONG PW")
                        // return res.status(403).json({ status: '403', msg: 'Wrong password' })
                    } else {
                        if (user.isAdmin) {
                            console.log("ADMIN")
                            // return res.status(200).json({ status: '200', msg: 'Admin Login' })
                        } else {
                            console.log("USER")
                            return user
                            // return res.status(200).json({ status: '200', msg: 'User Login' })
                        }
                    }

                });

                return null
            }
        })
    ],

    pages: {
        signIn: '/form/login',
    }
})

