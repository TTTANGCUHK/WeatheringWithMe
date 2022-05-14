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

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userFavLocSchema = new Schema({
        locName: {type: String, required: true},
        favLoc: {type: [{lid: Schema.Types.ObjectId, ref: 'locModel'}], required: true}
    },
    {
        timestamp: true
    })

let userFavLocModel = mongoose.model('userFavLocModel', userFavLocSchema)
module.exports = userFavLocModel