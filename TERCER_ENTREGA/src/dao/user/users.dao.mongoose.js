import { toPOJO } from '../../utils/utils.js'
import { userModel } from './users.models.js'
import { hash, verifyHash } from '../../utils/cryptographic.js'

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
    
    async verifyUser( email, password ){
      
        const user = await this.userModel.findOne( { email: email } )
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
  
    async findUpdateOne(id, data) {
      return toPOJO(await this.userModel.findByIdAndUpdate(id,data).lean());
    }

    async updateMany(query, data) {
      return toPOJO(await this.userModel.updateMany(query,data).lean());
    }
  
    async deleteOne(query) {
      return toPOJO(await this.userModel.deleteOne(query).lean());
    }
  async findDeleteOne(id){
    return toPOJO(await this.userModel.findByIdAndDelete(id).lean());
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