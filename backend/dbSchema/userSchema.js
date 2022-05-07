let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    username: {type: String, trim: true, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
},
{
    timestamp: true
})

/*userSchema.method.checkPassword = async (password) => {
    return (toString(this.password) == toString(password))
}*/

let userModel = mongoose.model('userModel', userSchema)
module.exports = userModel