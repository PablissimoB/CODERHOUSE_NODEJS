import { Router } from "express";
import { userModel } from "../models/users.models.js";

const userRouter = Router()
userRouter.get('/', async (req,res) => {
    try{
        const users = await userModel.find();
        res.status(200).send({mensaje: users});
    }
    catch(error){
        res.status(400).send({mensaje:error});
    }
})

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const users = await userModel.findById(id);
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

userRouter.post('/', async (req,res) => {
    const {nombre,userType, email, password} = req.body
    try{
        const respuesta = await userModel.create({nombre,userType, email, password});
        res.status(200).send({mensaje: respuesta});
    }
    catch(error){
        res.status(400).send({mensaje:error});
    }
})

userRouter.put('/:id', async (req, res) => {
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
userRouter.delete('/:id', async (req, res) => {
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
export default userRouter