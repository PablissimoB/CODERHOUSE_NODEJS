import { toPOJO } from '../../utils/utils.js'
import { userModel } from './users.models.js'

class UserDao {
  
    constructor() {
        this.usuariosModel = userModel
      }

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
      return toPOJO(await userModel.findOne(query).lean());
    }
  
    async readById(id){
      return toPOJO(await userModel.findById(id).lean());
    }
  
    async readMany(query) {
      return toPOJO(await userModel.find(query).lean());
    }
  
    async updateOne(query, data) {
      return toPOJO(await userModel.updateOne(query,data).lean());
    }
  
    async updateMany(query, data) {
      return toPOJO(await userModel.updateMany(query,data).lean());
    }
  
    async deleteOne(query) {
      return toPOJO(await userModel.deleteOne(query).lean());
    }
  
    async deleteMany(query) {
      return toPOJO(await userModel.deleteMany(query).lean());
    }
  }
  
  let userDaoMongo
  export async function getUserDao(){
    if(!userDaoMongo){
      userDaoMongo = new UserDao()
    }
    return userDaoMongo;
  }