let mongoose = require('mongoose')
let Schema = mongoose.Schema

const userFavLocSchema = new Schema(
    { lid: { type: Schema.Types.ObjectId, required: true, unique: true }},
    { timestamps: true },
)

const userSchema = new Schema(
    {
        username: { type: String, trim: true, required: true, unique: true },
        password: { type: String, required: true },
        salt: { type: String, required: true, unique: true },
        isAdmin: { type: Boolean, required: true, default: false },
        favLoc: { type: [userFavLocSchema], required: true, default: [] },
    },
    {
        timestamps: true
    },
)

/*userSchema.method.checkPassword = async (password) => {
    return (toString(this.password) == toString(password))
}*/

export default mongoose.models.userModel || mongoose.model('userModel', userSchema)