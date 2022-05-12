let mongoose = require('mongoose')
let Schema = mongoose.Schema

const locSchema = new Schema({
    locName: { type: String, required: true, unique: true },
    locData: {
        type: {
            name: String,
            latitude: Number,
            longitude: Number
        }, required: true
    },
    weatherData: {
        type: {
            temp_c: Number,
            wind_kph: Number,
            wind_dir: String,
            humidity: Number,
            precip_mm: Number,
            vis_km: Number
        }, required: true
    }
},
    {
        timestamp: true
    })

export default mongoose.models.locModel || mongoose.model('locModel', locSchema)