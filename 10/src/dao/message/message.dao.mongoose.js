import { toPOJO } from '../../utils/utils.js'
import { messageModel } from './messages.models.js';

class MessagetDao {
    constructor(){
        this.messageModel = messageModel
    }

    async create(data){
      const message = await this.messageModel.create(data)
      return message.toObject();
    }

  
    async readById(cid){
        return toPOJO(await this.messageModel.findById(cid).lean());
      }
    
    async readOne(query) {
      return toPOJO(await this.messageModel.findOne(query).lean());
    }
  
    async readMany() {
        const messages = await this.messageModel.find().lean();
      return toPOJO(messages);
    }
    
    async updateById(id,data){
        return toPOJO(await this.messageModel.findByIdAndUpdate(id,data).lean());
    }


    async updateOne(query, data) {
      return toPOJO(await this.messageModel.updateOne(query,data).lean());
    }
  
    async updateMany(query, data) {
      return toPOJO(await this.messageModel.updateMany(query,data).lean());
    }

    async deleteById(id){
        return toPOJO(await this.messageModel.findByIdAndDelete(id).lean());
    }
  
    async deleteOne(query) {
      return toPOJO(await this.messageModel.deleteOne(query).lean());
    }
  
    async deleteMany(query) {
      return toPOJO(await this.messageModel.deleteMany(query).lean());
    }
  }
  
  let messageDaoMongo
  export async function getMessageDao(){
    if(!messageDaoMongo){
        messageDaoMongo = new MessagetDao();
    }
    return messageDaoMongo;
  }