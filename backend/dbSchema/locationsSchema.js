let mongoose = require('mongoose')
let Schema = mongoose.Schema

const locSchema = new Schema({
    locName: { type: String, required: true },
    locData: {
        type: {
            name: String,
            latitude: Number,
            longitude: Number
        }, required: true
    },
    weatherData: { type: { weather: String }, required: true }
},
    {
        timestamp: true
    })

export default mongoose.models.locModel || mongoose.model('locModel', locSchema)