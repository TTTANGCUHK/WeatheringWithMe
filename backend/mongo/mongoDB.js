const mongoose = require('mongoose')
const config = require('../../config.json')
const mongoURI = config.mongoURI

const connectToMongoDB = async () => {
    // console.log('mongoURI', mongoURI)
    const debug = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = debug.connection
    db.on('error', ()=>{
        console.log('mongo error')
        process.exit()
    })
    console.log(`connected to ${db.host}`)
}

module.exports = connectToMongoDB