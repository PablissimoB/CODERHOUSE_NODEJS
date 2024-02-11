import { messagesServices } from "../services/messages.services.js";

export async function getAll(req,res,next){
    try{
        const messages = await messagesServices.getMessages();
        res.status(200).send(messages);
    }
    catch(error){
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