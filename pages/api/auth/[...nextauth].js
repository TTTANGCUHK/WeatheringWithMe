// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials"
import Router from "next/router";
import connectToMongoDB from "../../../backend/mongo/mongoDB";
import mongoose from "mongoose";
import userModel from "../../../backend/dbSchema/userSchema";
import APICRYPTO from "../APICRYPTO"

export default NextAuth({

    session: {
        jwt: true
    },

    providers: [
        CredentialProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {

                await connectToMongoDB()
                const db = await mongoose.connection
                const User = await userModel

                const result = await User.findOne({ username: credentials.username })

                if (!result) {
                    await db.close()
                    return null
                }

                const checkPw = await APICRYPTO.CRYPTO_PW(credentials.password, result.salt) === result.password

                if (!checkPw) {
                    await db.close()
                    return null
                }

                console.log(result)
                await db.close()
                return { uid: result._id, username: result.username, isAdmin: result.isAdmin }

            }
        })
    ],

    pages: {
        signIn: '/forms/login',
    },

    callbacks: {
        async session({ session, token, user }) {
            session.accessToken = token.accessToken
            session.user.uid = token.uid
            session.user.username = token.username
            session.user.isAdmin = token.isAdmin
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.access_token
                token.uid = user.uid
                token.username = user.username
                token.isAdmin = user.isAdmin
            }

            return token
        }
    }
})

