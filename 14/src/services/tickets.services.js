import { getTicketDao } from "../dao/ticket/tickets.dao.mongoose.js";

const ticketDao = await getTicketDao();

class TicketService {
    async getByIdTicket(id){
        return await ticketDao.readById(id);
    }

    async createTicket(data){
        try{
            return await ticketDao.create(data)
        }
        catch(error){
            
        }
    }
}

export const ticketService = new TicketService();