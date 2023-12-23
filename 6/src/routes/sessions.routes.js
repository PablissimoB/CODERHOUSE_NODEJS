import { Router } from "express";
import { userModel } from "../models/users.models";

const sessionsRouter = Router()
sessionsRouter.get('/', async (req,res) => {
    try{
       
    }
    catch(error){
        res.status(400).send({mensaje:error});
    }
})

sessionsRouter.post('/', async (req,res) => {
    const {nombre,userType, email, password} = req.body
    try{
        
    }
    catch(error){
        res.status(400).send({mensaje:error});
    }
})
sessionsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {nombre, userType, email, password} = req.body
    const users = await userModel.findByIdAndUpdate(id,{nombre, userType, email, password});
    try{
        if(users){
            res.status(200).send(users);
        }
        else{
            res.status(404).send("Usuario no existente");
        }
    }
    catch(error){
        res.status(400).send({mensaje:error});
    }
})
sessionsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const users = await userModel.findByIdAndDelete(id);
    try{
        if(users){
            res.status(200).send(users);
        }
        else{
            res.status(404).send("Usuario no existente");
        }
    }
    catch(error){
        res.status(400).send({mensaje:error});
    }
})
export default sessionsRouter