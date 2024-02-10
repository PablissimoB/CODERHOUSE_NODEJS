import { Router } from "express";
import { messageModel } from "../../dao/message/messages.models.js";

const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
    try{
        const prods = await messageModel.find();
        res.status(200).send();
    }
    catch(error){
        res.status(400).send("Error");        
    }
})

messageRouter.post('/',async(req,res) =>{
    const {code} = req.body;

        const alta = messageModel.create(req.body);
        if(alta){
            res.status(200).send();
        }
})

export default messageRouter;