import { ErrorType } from "../error/enum.js";
import { cartsServices } from "../services/carts.services.js";
import { ProductsServices } from "../services/products.services.js";
import { ticketService } from "../services/tickets.services.js";
import { errorService } from "../error/error.services.js";
import { addLoggerHistorial, logger } from "../utils/logger.js";

export async function getAll(req,res,next){
    try {
        const cid = req.params.cid;
        const cart = await cartsServices.getById(cid);
        if (cart){
            res.status(200).send(cart);
        }

    } catch (error) {
        logger.error(error.message)
        addLoggerHistorial(error.message)
        const errorNew = errorService.newError(ErrorType.SERVER_ERROR, error.message)
        next(errorNew);
    }   
}
export async function purchase(req,res,next){
    try {
    const cid = req.params.cid;
    const email = req.body;

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
            cart.products = productsUnavailables;
            await cartsServices.putOne({_id: cid}, {$set:cart});

            res.status(200).send(ticket);
        }
    }
    else{
        const errorNew = errorService.newError(ErrorType.NOT_FOUND, 'Carrito no existente')
        next(errorNew);
    }
} catch (error) {
    logger.error(error.message)
    addLoggerHistorial(error.message) 
    const errorNew = errorService.newError(ErrorType.POST_ERROR, 'Error al generar Ticket')
    next(errorNew);  
}  
    

}


export async function post(req,res,next){
    try{
        const alta = await cartsServices.newCart();
        if(alta){
            res.status(200).send("Alta realizada");
        }
    }
        catch(error){
            logger.error(error.message)
            addLoggerHistorial(error.message)
            const errorNew = errorService.newError(ErrorType.POST_ERROR, 'Error al agregar registro')
            next(errorNew);
        }
}

export async function substractProductToCart(req,res,next){
    try{
        const cid = req.params.cid;
        const pid = req.params.pid;
       
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
                    const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'No existe el producto que desea borrar en el carrito')
                    next(errorNew);
                    // res.status(400).send("No existe el producto que desea borrar en el carrito");
                }
            }
            else{
                const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'El carrito que trata de modificar no existe')
                next(errorNew);
                // res.status(400).send("No existe el carrito");
            }
        }
        catch(error){
                logger.error(error.message)
 addLoggerHistorial(error.message) 
            addLoggerHistorial(error.message)
            const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'Error al modificar carrito')
            next(errorNew);
        }
}

export async function addProductToCart(req,res,next){
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
                const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'El producto que trata de agregar no existe')
                next(errorNew);
                // res.status(404).send("Producto inexistente");
            }
            
        }
        

    }
    catch (error){
        logger.error(error.message)
        addLoggerHistorial(error.message)
        const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'El carrito que trata de modificar no existe')
        next(errorNew);
        // next(error)
        
    }
}

export async function emptyCart (req,res,next) {
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
    }
    catch(error){

        logger.error(error.message)
        addLoggerHistorial(error.message)
        const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'No existe el carrito')
            next(errorNew);
            // next(error)
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
                const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'El producto ya figura en el carrito')
                next(errorNew);
                // res.status(400).send("El producto ya figura en el carrito");
            }
        }
        else {
            const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'No existe el carrito')
            next(errorNew);
            // res.status(400).send('No se encontró el carrito');
        }
    }
    catch(error){
        logger.error(error.message)
        addLoggerHistorial(error.message)
        const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'Error al vaciar el carrito')
        next(errorNew);
    }
}

export async function modifyProductQuantityCart (req,res,next) {
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
                const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'No existe el producto que desea modificar en el carrito')
                next(errorNew);
                // res.status(400).send("No existe el producto que desea modificar en el carrito");
            }
        }
        else {
            const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'No se encontró el carrito')
            next(errorNew);
            // res.status(400).send('No se encontró el carrito');
        }
    }
    catch(error){
        logger.error(error.message)
        addLoggerHistorial(error.message)
        const errorNew = errorService.newError(ErrorType.UPDATE_ERROR, 'Error en el la actualizacion del carrito')
        next(errorNew);
        // next(error)
    }
}