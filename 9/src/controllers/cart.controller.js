import { cartsServices } from "../services/carts.services.js";

export async function getAll(req,res,next){
    try {
        const cid = req.params.cid;
        const cart = await cartsServices.getById(cid);
        if (cart){
            res.status(200).send(cart);
        }
        else{
            res.status(404).send("Carrito inexistente");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });      
    }   
}

export async function post(req,res,next){
    try{
        const alta = await cartsServices.newCart();
        if(alta){
            res.status(200).send("Alta realizada");
        }
        else{
            res.status(404).send("Error");
        }
    }
        catch(error){
            res.status(500).send("Error:"+error);
        }
}