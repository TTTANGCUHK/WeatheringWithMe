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

let locCmSchema = new Schema({
    locId: { type: Schema.Types.ObjectId, required: true, ref: 'locModel' },
    comments: {
        type: [{
            body: String,
            createTime: Date,
            updateTime: Date
        }], required: true
    }
},
    {
        timestamp: true
    })

export default mongoose.models.locCmModel || mongoose.model('locCmModel', locCmSchema)