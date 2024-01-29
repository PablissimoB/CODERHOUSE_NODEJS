import { usersServices } from "../services/users.services.js";
import { ObjectId as ObjId } from "mongoose";

export async function get(req,res,next){
    const id = req.params.id;
        const user = await usersServices.getUser('_id', id)
        try {
            if (user) {
                res.status(200).send(user);
            }
            else {
                res.status(404).send("Usuario no existente");
            }
        }
        catch (error) {
            res.status(400).send({ mensaje: error });
        }
}

export async function post(req,res,next){
    try {
        const usuario = await usersServices.addUser(req.body)
        req.user = user
        res.status(201).json({
            status: 'success',
            payload: user.toObject(),
            token
        });
        next();
    }
    catch (error) {
        res.status(400).send({ mensaje: error });
    }
}