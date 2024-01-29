import { Schema, model } from "mongoose"
import { hash, verifyHash } from '../../utils/cryptographic.js';

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

class UserDao {
  async create(data){
    try {
      if (data.password) {
        data.password = await hash(data.password)
      }
      delete data.rol
      const user = await userModel.create(data)
      return user.toObject()
    } catch (error) {
      const typedError = new Error(error.message)
      typedError['type'] = 'INVALID_ARGUMENT'
      throw typedError
    }
    
  }

  async readOne(query) {
    return await userModel.findOne(query).lean()
  }

  async readById(id){
    return await userModel.findById(id).lean()
  }

  async readMany(query) {
    return await userModel.find(query).lean()
  }

  async updateOne(query, data) {
    return await userModel.updateOne(query,data).lean()
  }

  async updateMany(query, data) {
    return await userModel.updateMany(query,data).lean()
  }

  async deleteOne(query) {
    return await userModel.deleteOne(query).lean()
  }

  async deleteMany(query) {
    return await userModel.deleteMany(query).lean()
  }
}

let userDaoMongo
export async function getUserDao(){
  if(!userDaoMongo){
    userDaoMongo = new UserDao()
  }
  return userDaoMongo;
}