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