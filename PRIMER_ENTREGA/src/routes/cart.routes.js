import { Router } from "express";
import {CartManager as cm} from '../cart_manager.js';
import {ProductManager as pm} from '../product_manager.js';

const cartRouter = Router()

const cartManager  = new cm('src/carrito.json');
const productManager = new pm('src/productos.json');

cartRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(parseInt(cid));
    if (cart)
        res.status(200).send(cart);
    else
        res.status(404).send("Carrito inexistente");
})

cartRouter.post('/',async(req,res) =>{
        const alta = cartManager.addCart(req.body);
        if(alta){
            res.status(200).send("Alta realizada");
        }
        else{
            res.status(404).send("Error");
        }
})

cartRouter.post('/:cid/product/:pid',async(req,res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const prod = await productManager.getProductById(parseInt(pid));
    const cart = await cartManager.getCartById(parseInt(cid));
    if(prod){
        if(cart){
            const alta = cartManager.addProductToCart(cid,pid);
            res.status(200).send(`Producto ${pid} agregado al carrito ${cid}`);
        }
        else{
            res.status(404).send("Carrito inexistente");
        }

    }
    else{
        if(cart){
            res.status(404).send(`El producto que quiere agregar al carrito ${cid} no existe`);
        }
        else{
            res.status(404).send(`El producto y el carrito no existen`);
        }
    }
})
export default cartRouter