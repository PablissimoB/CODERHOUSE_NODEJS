import { logger } from "../utils/logger.js";
import { ticketService } from "../services/tickets.services.js";
import { ErrorType } from "../error/enum.js";
import { errorService } from "../error/error.services.js";

export async function post(req,res,next){
    try{
        const alta = await ticketService.createTicket(req.body);
        if(alta){
            res.status(200).send(alta);
        }
        else{
            const errorNew = errorService.newError(ErrorType.POST_ERROR, 'Error al agregar registro')
            next(errorNew);
        }

    }
        catch(error){
            logger.info(error.message)
            const errorNew = errorService.newError(ErrorType.POST_ERROR, error.message)
            next(errorNew);
        }
}
export async function getByIdTicket(req,res, next){
    try {
        const id = req.params.id;
        const ticket = await ticketService.getByIdTicket(id);
        if (ticket){
            res.status(200).send(ticket);
        }
        else{
            logger.info(error.message)
            const errorNew = errorService.newError(ErrorType.NOT_FOUND, 'Ticket no existente')
            next(errorNew);    
        }

    } catch (error) {
        logger.info(error.message)
        const errorNew = errorService.newError(ErrorType.SERVER_ERROR, error.message)
        next(errorNew);
    }   
}