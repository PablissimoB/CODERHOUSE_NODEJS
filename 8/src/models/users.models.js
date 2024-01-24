import { Schema, model } from "mongoose"

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    role: {
        type: String,
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
        versionKey: false,
        statics: {
            login: async function (email, password) {
                const usuario = await userModel.findOne({ email }).lean()

                if (!usuario) {
                    throw new Error('login failed')
                }
                if (!password == usuario.password) {
                    throw new Error('login failed')
                }

                return usuario
            }
        }
    }
)
export const userModel = model('users', userSchema);