let mongoose = require('mongoose')
let Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false }
},
    {
        timestamp: true
    })

/*userSchema.method.checkPassword = async (password) => {
    return (toString(this.password) == toString(password))
}*/

export default mongoose.models.userModel || mongoose.model('userModel', userSchema)