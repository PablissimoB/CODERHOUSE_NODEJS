import { Schema, model } from "mongoose"

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    cart: {
        type: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'carts',
                }
            }
        ],
        default: []
    }
},
    {
        strict: 'throw',
        versionKey: false
    }
)
export const userModel = model('users', userSchema);

