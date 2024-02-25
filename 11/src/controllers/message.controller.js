import { messagesServices } from "../services/messages.services.js";
import { addLoggerHistorial, logger } from "../utils/logger.js";

export async function getAll(req,res,next){
    try{
        const messages = await messagesServices.getMessages();
        res.status(200).send(messages);
    }
    catch(error){
            logger.error(error.message)
 addLoggerHistorial(error.message) 
        res.status(400).send(error);        
    }
}

export async function post(req,res,next){
    const {code} = req.body;

    const alta = await messagesServices.createMessage(req.body);
    if(alta){
        res.status(200).send();
    }
}