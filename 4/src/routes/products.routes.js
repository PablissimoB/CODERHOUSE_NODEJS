import { Router } from "express";
import {ProductManager as pm} from '../product_manager.js';

const productManager = new pm('src/productos.json');
const prodsRouter = Router();

prodsRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    const prods = await productManager.getProducts();
    const products = prods.slice(0, limit);
    res.status(200).send(products);
})

prodsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const prod = await productManager.getProductById(id);
    if (prod)
        res.status(200).send(prod);
    else
        res.status(404).send("Producto no existente");
})

prodsRouter.post('/',async(req,res) =>{
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
})

prodsRouter.put('/:id', async(req,res) =>{
    const {id} = req.params;
    const prod = await productManager.getProductById(id)
    if (prod)
    {
        const actualizado = productManager.updateProduct(id,req.body);
        res.status(200).send("Producto actualizado");
    }
    else
        res.status(404).send("El producto que trata de modificar no existe");
})

prodsRouter.delete('/:id', async(req,res) =>{
    const {id} = req.params;
    const prod = await productManager.getProductById(id);
    if (prod)
    {
        const actualizado = productManager.deleteProduct(id);
        res.status(200).send("Producto elimado");
    }
    else
        res.status(404).send("El producto que trata de eliminar no existe");
})
export default prodsRouter;