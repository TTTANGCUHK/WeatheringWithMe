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

const locCmSchema = new Schema({
    uid: {type: Schema.Types.ObjectId, required: true, unique: true },
    body: { type: String, required: true },
}, { timestamps: true })

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
    },
    comments: {
        type: [locCmSchema],
        required: true,
        default: [],
    },
},
    {
        timestamps: true
    })

export default mongoose.models.locModel || mongoose.model('locModel', locSchema)