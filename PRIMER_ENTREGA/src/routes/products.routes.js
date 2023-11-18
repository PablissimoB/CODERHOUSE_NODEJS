import { Router } from "express";
import {ProductManager as pm} from '../product_manager.js';

const productManager = new pm('src/productos.json');
const prodsRouter = Router();

prodsRouter.get('/', async (req, res) => {
    try{
        const { limit } = req.query;
        const prods = await productManager.getProducts();
        const products = prods.slice(0, limit);
        res.status(200).send(products);
    }
    catch(error){
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
})

prodsRouter.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const prod = await productManager.getProductById(id);
        if (prod)
            res.status(200).send(prod);
        else
            res.status(404).send("Producto no existente");
    }
    catch(error){
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
})

prodsRouter.post('/',async(req,res) =>{
    try{
        const {code} = req.body;
        const noExiste = await productManager.verifyCode(code);
        if(noExiste){
            const alta = productManager.addProduct(req.body);
            if(alta){
                res.status(200).send("Alta realizada");
            }
        }
        else{
            res.status(404).send("Ya existe un producto con ese codigo");
        }
    }
    catch(error){
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
})

prodsRouter.put('/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const prod = await productManager.getProductById(id)
        if (prod)
        {
            const actualizado = productManager.updateProduct(id,req.body);
            res.status(200).send("Producto actualizado");
        }
        else
            res.status(404).send("El producto que trata de modificar no existe");
    }
    catch(error){
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
})

prodsRouter.delete('/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const prod = await productManager.getProductById(id);
        if (prod)
        {
            const actualizado = productManager.deleteProduct(id);
            res.status(200).send("Producto eliminado");
        }
        else
            res.status(404).send("El producto que trata de eliminar no existe");
    }
    catch(error){
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
})
export default prodsRouter;