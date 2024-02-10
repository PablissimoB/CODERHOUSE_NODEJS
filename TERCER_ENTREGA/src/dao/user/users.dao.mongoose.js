import { toPOJO } from '../../utils/utils.js'
import { userModel } from './users.models.js'
import { hash } from '../../utils/cryptographic.js'

class UserDao {
  
    constructor() {
        this.userModel = userModel
      }

    async new(data){
      try {
        if (data.password) {
          data.password = await hash(data.password)
        }
        delete data.rol
        const user = await this.userModel.create(data)
        return user.toObject()
      } catch (error) {
        const typedError = new Error(error.message)
        typedError['type'] = 'INVALID_ARGUMENT'
        throw typedError
      }
      
    }
  
    async readOne(query) {
      return toPOJO(await this.userModel.findOne(query).lean());
    }
  
    async readById(id){
      return toPOJO(await this.userModel.findById(id).lean());
    }
  
    async readMany() {
      return toPOJO(await this.userModel.find().lean());
    }
  
    async updateOne(query, data) {
      return toPOJO(await this.userModel.updateOne(query,data).lean());
    }
  
    async updateMany(query, data) {
      return toPOJO(await this.userModel.updateMany(query,data).lean());
    }
  
    async deleteOne(query) {
      return toPOJO(await this.userModel.deleteOne(query).lean());
    }
  
    async deleteMany(query) {
      return toPOJO(await this.userModel.deleteMany(query).lean());
    }
  }
  
  let userDaoMongo
  export async function getUserDao(){
    if(!userDaoMongo){
      userDaoMongo = new UserDao()
    }
    return userDaoMongo;
  }