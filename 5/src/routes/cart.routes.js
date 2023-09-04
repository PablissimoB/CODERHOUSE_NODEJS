import { Router } from "express";
import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

const cartRouter = Router()

cartRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartModel.findById(parseInt(cid));
    if (cart)
        res.status(200).send(cart);
    else
        res.status(404).send("Carrito inexistente");
})

cartRouter.post('/',async(req,res) =>{
        const alta = cartModel.create();
        if(alta){
            res.status(200).send("Alta realizada");
        }
        else{
            res.status(404).send("Error");
        }
})

cartRouter.post('/:cid/products/:pid',async(req,res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartModel.findById(parseInt(cid));
    try{
        if(cart){
            const prod = await productModel.findById(parseInt(pid));
            if(prod){
                const indice = cart.products.findIndex(prod => prod.id_prod === pid);
                if(indice == -1){
                    cart.products.push({id_prod: pid, quantity: 1});
                }
                else{
                    cart.products[indice].quantity = cart.products[indice].quantity+1;
                }
                const alta = await cartModel.findByIdAndUpdate(cid,cart);
                res.status(200).send(`Producto ${pid} agregado al carrito ${cid}`);
            }
            else{
                res.status(404).send("Producto inexistente");
            }
            
        }
        else{
            res.status(404).send("Carrito inexistente");
        }

    }
    catch (error){

            res.status(400).send(`Error`);
        
    }
})
export default cartRouter