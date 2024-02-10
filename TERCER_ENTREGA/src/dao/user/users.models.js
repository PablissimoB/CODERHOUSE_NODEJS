import { Schema, model } from "mongoose"
import { hash, verifyHash } from '../../utils/cryptographic.js';
import { toPOJO } from '../../utils/utils.js'

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
        versionKey: false,
        statics: {
            autenticar: async function ({ email, password }) {
                const user = await this.findOne({ email })
                if (!user) {
                  const typedError = new Error('error de autenticacion')
                  typedError['type'] = 'FAILED_AUTHENTICATION'
                  throw typedError
                }
                if (!verifyHash(password ,user.password)) {
                  const typedError = new Error('error de autenticacion')
                  typedError['type'] = 'FAILED_AUTHENTICATION'
                  throw typedError
                }
                return user.toObject()
              }
            }
    }
)
export const userModel = model('users', userSchema);

