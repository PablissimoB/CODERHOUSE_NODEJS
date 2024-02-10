import {Schema, model} from "mongoose"
import { toPOJO } from '../../utils/utils.js'

const messageSchema = new Schema ({
    email: {
        type: String,
        required: true
    } ,
    message: {
        type: String,
    },
    postTime:{
        type: Date,
        default: Date.now
    }
})
export const messageModel = model('messages',messageSchema);

class MessagetDao {
    async create(data){
      const message = await messageModel.create(data)
      return message.toObject();
    }

  
    async readById(cid){
        return toPOJO(await messageModel.findById(cid).lean());
      }
    
    async readOne(query) {
      return toPOJO(await messageModel.findOne(query).lean());
    }
  
    async readMany(query) {
      return toPOJO(await messageModel.find(query).lean());
    }
    
    async updateById(id,data){
        return toPOJO(await messageModel.findByIdAndUpdate(id,data).lean());
    }


    async updateOne(query, data) {
      return toPOJO(await messageModel.updateOne(query,data).lean());
    }
  
    async updateMany(query, data) {
      return toPOJO(await messageModel.updateMany(query,data).lean());
    }

    async deleteById(id){
        return toPOJO(await messageModel.findByIdAndDelete(id).lean());
    }
  
    async deleteOne(query) {
      return toPOJO(await messageModel.deleteOne(query).lean());
    }
  
    async deleteMany(query) {
      return toPOJO(await messageModel.deleteMany(query).lean());
    }
  }
  
  let messageDaoMongo
  export async function getMessageDao(){
    if(!messageDaoMongo){
        messageDaoMongo = new MessagetDao();
    }
    return messageDaoMongo;
  }