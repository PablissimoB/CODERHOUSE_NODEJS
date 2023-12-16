import { Router } from "express";
import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

const cartRouter = Router()

cartRouter.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartModel.findById(cid).lean();
    if (cart)
        res.status(200).send(cart);
    else
        res.status(404).send("Carrito inexistente");
})

cartRouter.post('/',async(req,res) =>{
    try{
        const alta = await cartModel.create();
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
})

cartRouter.post('/:cid/products/:pid',async(req,res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    try{
        const cart = await cartModel.findById((cid));
        const prod = await productModel.findById((pid));
        if(cart){
            if(prod){
                const indice = cart.products.findIndex(prod => prod._id.toString() == pid);
                if(indice == -1){
                    cart.products.push({'_id': pid, 'quantity': 1});
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

            res.status(400).send(`Error: ${error}`);
        
    }
})

cartRouter.delete('/:cid/products/:pid', async(req,res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;

    try{
        const cart = await cartModel.findById(cid);
        if(cart){
            const newProductsArray = cart.products.filter(product => product._id != pid)
            if(newProductsArray){
                cart.products = newProductsArray;
                const actualizado = await cartModel.updateOne({_id: cid}, {$set:cart});
                if(actualizado){
                    res.status(200).send("Producto borrado del carrito");
                }
            }
            else{
                res.status(400).send("No existe el producto que desea borrar en el carrito");
            }
        }
        else{
            res.status(400).send("No existe el carrito");
        }
    }
    catch(error){
        res.status(404).send("Hubo un problema en el proceso");
    }
})

cartRouter.delete('/:cid', async(req,res) =>{
    const cid = req.params.cid;

    try{
        const cart = await cartModel.findById(cid);
        if(cart){
            cart.products = [];
            const actualizado = await cartModel.updateOne({_id: cid}, {$set:cart});
            if(actualizado){
                res.status(200).send("Productos borrados del carrito");
            }
        }
        else{
            res.status(400).send("No existe el carrito");
        }
    }
    catch(error){
        res.status(404).send("Hubo un problema en el proceso");
    }
})

//completar metodo
cartRouter.put('/:cid', async (req, res) => {
    const cid = req.params.cid;
    // const cart = await cartModel.findById(cid).lean();
    // if (cart)
    //     res.status(200).send(cart);
    // else
    //     res.status(404).send("Carrito inexistente");
})

//completar metodo
cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    // const cart = await cartModel.findById(cid).lean();
    // if (cart)
    //     res.status(200).send(cart);
    // else
    //     res.status(404).send("Carrito inexistente");
})


export default cartRouter