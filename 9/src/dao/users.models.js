import { Schema, model } from "mongoose"
import { hash, verifyHash } from '../utils/cryptographic.js';

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
            register: async function (userData) {
                try {
                  if (userData.password) {
                    userData.password = await hash(userData.password)
                  }
                  delete userData.rol
                  const user = await this.create(userData)
                  return user.toObject()
                } catch (error) {
                  const typedError = new Error(error.message)
                  typedError['type'] = 'INVALID_ARGUMENT'
                  throw typedError
                }
              },
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