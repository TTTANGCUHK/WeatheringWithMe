// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

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