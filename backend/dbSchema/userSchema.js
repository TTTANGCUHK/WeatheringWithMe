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