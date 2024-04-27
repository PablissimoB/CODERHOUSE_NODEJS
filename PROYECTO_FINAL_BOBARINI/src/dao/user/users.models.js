import { Schema, model } from "mongoose"

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    last_login:{
        type: Date,
        default: Date.now
    },
    current_cart:{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'carts',
            required: false
        }
    }
    ,
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
                },
                status: {
                    type: Boolean
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

