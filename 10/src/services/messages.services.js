import { getMessageDao } from "../dao/message/message.dao.mongoose.js";

const messageDao = await getMessageDao();

class MessageServices{
    async getMessages(){
        return await messageDao.readMany();
    }
    async createMessage(data){
        return await messageDao.create(data);
    }
}

export const messagesServices = new MessageServices();