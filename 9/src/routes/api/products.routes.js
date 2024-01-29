import { Router } from "express";
import { productModel } from "../../dao/models/products.models.js";
import { getAll, getById, post } from "../../controllers/product.controller.js";

const prodsRouter = Router();

prodsRouter.get('/', getAll)
prodsRouter.get('/:id', getById )
prodsRouter.post('/',post)
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
        const actualizado = await productModel.findByIdAndDelete(id);
        if(actualizado){
            res.status(200).send("Producto borrado");
        }
    }
    catch(error){
        res.status(404).send("El producto que trata de eliminar no existe");
    }
})
export default prodsRouter;