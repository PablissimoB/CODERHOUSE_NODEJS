import { Router } from "express";
import { cartModel } from "../../dao/models/carts.models.js";
import { productModel } from "../../dao/models/products.models.js";
import { getAll, post } from "../../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.get('/:cid', getAll)

cartRouter.post('/',post)

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
        res.status(400).send(`Error: ${error}`);
    }
})

cartRouter.put('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.body.pid;
    try{
        const cart = await cartModel.findById(cid);
        if(cart){
            const productF = await productModel.find(pid);
            const prod = cart.products.find(product => product._id.toString() == pid);
            if(!prod){
                const prodToAdd = {_id: productF._id, quantity: 1}
                cart.products.push(prodToAdd)
                await cart.save();
            }
            else{
                res.status(400).send("El producto ya figura en el carrito");
            }
        }
        else {
            res.status(400).send('No se encontró el carrito');
        }
    }
    catch(error){
        res.status(400).send(`Error: ${error}`);
    }
    
})

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    try{
        const cart = await cartModel.findById(cid);
        if(cart){
            const prod = cart.products.find(product => product._id.toString() == pid);
            if(prod){
                prod.quantity = quantity;
                await cart.save();
            }
            else{
                res.status(400).send("No existe el producto que desea modificar en el carrito");
            }
        }
        else {
            res.status(400).send('No se encontró el carrito');
        }
    }
    catch(error){
        res.status(400).send(`Error: ${error}`);
    }

})


export default cartRouter