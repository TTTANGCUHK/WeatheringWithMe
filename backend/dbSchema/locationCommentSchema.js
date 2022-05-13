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