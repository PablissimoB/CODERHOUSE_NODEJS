import { ticketService } from "../services/tickets.services.js";

export async function post(req,res){
    try{
        const alta = await ticketService.createTicket(req.body);
        if(alta){
            res.status(200).send(alta);
        }
        else{
            res.status(404).send("Error");
        }
    }
        catch(error){
            res.status(500).send("Error:"+error);
        }
}
export async function getByIdTicket(req,res){
    try {
        const id = req.params.id;
        const ticket = await ticketService.getByIdTicket(id);
        if (ticket){
            res.status(200).send(ticket);
        }
        else{
            res.status(404).send("Carrito inexistente");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });      
    }   
}