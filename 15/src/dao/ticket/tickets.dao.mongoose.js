import { toPOJO } from '../../utils/utils.js'
import { ticketModel } from './tickets.models.js';

class TicketDao {
    constructor(){
        this.ticketModel = ticketModel;
    }

    async create(data){
      const ticket = await this.ticketModel.create(data)
      return ticket.toObject();
    }

  
    async readById(cid){
        return toPOJO(await toPOJO(this.ticketModel.findById(cid).lean()));
      }
    
    async readOne(query) {
      return toPOJO(await toPOJO(this.ticketModel.findOne(query).lean()));
    }
  
    async readMany(query) {
      return toPOJO(await toPOJO(this.ticketModel.find(query).lean()));
    }
    
    async updateById(id,data){
        return toPOJO(await this.ticketModel.findByIdAndUpdate(id,data).lean());
    }


    async updateOne(query, data) {
      return toPOJO(await this.ticketModel.updateOne(query,data).lean());
    }
  
    async updateMany(query, data) {
      return toPOJO(await this.ticketModel.updateMany(query,data).lean());
    }

    async deleteById(id){
        return toPOJO(await this.ticketModel.findByIdAndDelete(id).lean());
    }
  
    async deleteOne(query) {
      return toPOJO(await this.ticketModel.deleteOne(query).lean());
    }
  
    async deleteMany(query) {
      return toPOJO(await this.ticketModel.deleteMany(query).lean());
    }
  }
  
  let ticketDaoMongo
  export async function getTicketDao(){
    if(!ticketDaoMongo){
        ticketDaoMongo = new TicketDao();
    }
    return ticketDaoMongo;
  }