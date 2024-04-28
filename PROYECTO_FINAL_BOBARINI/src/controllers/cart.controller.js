import { cartsServices } from "../services/carts.services.js";
import { ProductsServices } from "../services/products.services.js";
import { ticketService } from "../services/tickets.services.js";
import { usersServices } from "../services/users.services.js";

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
export async function purchase(req,res,next){
    try {
    const email = req.body.email;
    const uid = req.body._id;
    const user = await usersServices.getUser('_id', uid);
    const cid = user.current_cart;
    
    const cart = await cartsServices.getById(cid);
    if (cart){
        
        const prods = await ProductsServices.getProducts();
        if(prods){

            //verifico stock y cantidad
            const productsUnavailables = cart.products.filter(cartProduct => {
                const matchingProduct = prods.find(product => product._id === cartProduct._id._id);
                return matchingProduct && cartProduct.quantity > matchingProduct.stock;
            });

            //extraigo del carrito aquellos productos que no estan disponibles
            cart.products = cart.products.filter(cartProduct => {
                const matchingProduct = prods.find(product => product._id === cartProduct._id._id);
                return !matchingProduct || cartProduct.quantity <= matchingProduct.stock;
            });

            

            //recorro cada producto del carrito para calcular monto total
            let amount =0
            for(const product of cart.products) {
                amount += Number(product._id.price) * Number(product.quantity);
                
                //actualizo stock
                const prod = await ProductsServices.getById(product._id._id)
                const newStock = prod.stock - product.quantity;
                await ProductsServices.putOne(product._id._id,{stock : newStock} )
            }

            //creo el ticket
            const ticket = await ticketService.createTicket({amount : amount , purchaser: email.email });
            
            //actualizo carrito con productos no disponibles
            // cart.products = productsUnavailables;
            // await cartsServices.putOne({_id: cid}, {$set:cart});

            //creo nuevo carrito
            const newCart = await cartsServices.newCart();

            //agrego a usuario el nuevo carrito 
            const cartUpdated = user.cart;
            if(newCart){
                cartUpdated.push({ _id: newCart._id });
            }

            //cambio current_cart
            const userUpdated = await usersServices.updateUser(uid, {current_cart: newCart._id, cart: cartUpdated })

            res.status(200).send(ticket);
        }
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
            res.status(200).send(alta);
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
                const newProductsArray = cart.products.filter(product => product._id._id != pid
                )
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

export async function addProductToCart(req,res){
    const cid = req.params.cid;
    const pid = req.params.pid;
    try{
        const cart = await cartsServices.getById(cid);
        const prod = await ProductsServices.getById((pid));
        if(cart){
            if(prod){
                const indice = cart.products.findIndex(prod => prod._id._id == pid);
                if(indice == -1){
                    cart.products.push({'_id': pid, 'quantity': 1});
                }
                else{
                    cart.products[indice].quantity = cart.products[indice].quantity+1;
                }
                const alta = await cartsServices.putOne({_id: cid}, {$set:cart});
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
}

export async function emptyCart (req,res) {
    const cid = req.params.cid;
    try{
        const cart = await cartsServices.getById(cid);
        if(cart){
            cart.products = [];
            const actualizado = await cartsServices.putOne({_id: cid}, {$set:cart});
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
}
export async function modifyCart (req,res) {
    const cid = req.params.cid;
    const pid = req.body.pid;
    try{
        const cart = await cartsServices.getById(cid);
        if(cart){
            const productF = await ProductsServices.getById((pid));
            const prod = cart.products.find(product => product._id._id == pid);
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
}

export async function modifyProductQuantityCart (req,res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    try{
        const cart = await cartsServices.getById(cid);
        if(cart){
            const prod = cart.products.find(product => product._id._id == pid);
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
}