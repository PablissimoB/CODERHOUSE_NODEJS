import { Router } from "express";
import { userModel } from "../models/users.models.js";
import { encrypt } from "../utils/cryptographic.js";

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
    const {first_name,last_name, role, email, password} = req.body
    try{
        const user = await userModel.create({first_name, last_name,role, email, password});
        const token = encrypt(user.toObject());

        res.json({
            status:'success',
            payload: user.toObject(),
            token
        });
    }
    catch(error){
        res.status(400).send({mensaje:error});
    }
})

userRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {first_name,last_name, role, email, password} = req.body
    const users = await userModel.findByIdAndUpdate(id,{first_name,last_name, role, email, password});
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