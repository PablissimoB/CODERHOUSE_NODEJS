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

export async function substractProductToCart(req,res,next){
    try{
        const cid = req.params.cid;
        const pid = req.params.pid;
        try{
            const cart = await cartsServices.getById(cid);
            if(cart){
                const newProductsArray = cart.products.filter(product => product._id != pid)
                if(newProductsArray){
                    cart.products = newProductsArray;
                    const actualizado = await cartsServices.putOne({_id: cid}, {$set:cart});
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
    }
        catch(error){
            res.status(500).send("Error:"+error);
        }
}