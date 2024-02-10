import { Router } from "express";
import { cartModel } from "../../dao/cart/carts.models.js";
import { productModel } from "../../dao/product/products.models.js";
import { addProductToCart, getAll, post, substractProductToCart } from "../../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.get('/:cid', getAll)
cartRouter.post('/',post)
cartRouter.post('/:cid/products/:pid', addProductToCart)
cartRouter.delete('/:cid/products/:pid', substractProductToCart)

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