import { Router } from "express";
import { productModel } from "../models/products.models.js";

const prodsRouter = Router();

prodsRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    try{
//        const prods = await productModel.find().limit(limit);
        const prods = await productModel.find();
        res.status(200).send(prods.slice(0, limit));
    }
    catch(error){
        res.status(400).send("Error");        
    }
})

prodsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const prod = await productModel.findById(parseInt(id));
    if (prod)
        res.status(200).send(prod);
    else
        res.status(404).send("Producto no existente");
})

prodsRouter.post('/',async(req,res) =>{
    const {code} = req.body;
    const noExiste = await productModel.findOne(code);
    if(noExiste){
        const alta = productModel.create(req.body);
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
    try{
        const actualizado = productModel.findByIdAndUpdate(id,req.body);
        res.status(200).send("Producto actualizado");
    }
    catch(error){
        res.status(404).send("El producto que trata de modificar no existe");
    }
        
})

prodsRouter.delete('/:id', async(req,res) =>{
    const {id} = req.params;
    try{
        const actualizado = productModel.findByIdAndDelete(id,req.body);
        res.status(200).send("Producto actualizado");
    }
    catch(error){
        res.status(404).send("El producto que trata de modificar no existe");
    }
})
export default prodsRouter;