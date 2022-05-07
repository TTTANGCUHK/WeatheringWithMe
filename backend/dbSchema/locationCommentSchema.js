let mongoose = require('mongoose')
let Schema = mongoose.Schema

let locCmSchema = new Schema({
        locId: {type: Number, required: true},
        comments: {type: [{
                body: String,
                createTime: Date,
                updateTime: Date
            }], required: true}
    },
    {
        timestamp: true
    })

let locCmModel = mongoose.model('locCmModel', locCmSchema)
module.exports = locCmModel