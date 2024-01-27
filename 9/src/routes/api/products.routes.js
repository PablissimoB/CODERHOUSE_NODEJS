import { Router } from "express";
import { productModel } from "../../dao/products.models.js";

const prodsRouter = Router();

prodsRouter.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort ||"" ;
    const titleQuery  = req.query.title || "";
    const categoryQuery   = req.query.categoryQuery || "";

    const criterio = {};

    const opciones = {
        limit : limit,
        page : page,
        lean: true
    }

    if(sort) {
        opciones.sort = sort === "ASC"? {price: 1} : { price: -1};
    }
    if (titleQuery) { criterio.title = titleQuery }
    if (categoryQuery) { criterio.category = categoryQuery }

    try{
        const prods = await productModel.paginate(criterio, opciones);
        res.status(200).send(prods);
    }
    catch(error){
        res.status(400).json({ message: error.message });        
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
    try{
        const {code} = req.body;
        const Existe = await productModel.findOne({code: code});
        if(!Existe){
            const alta = await productModel.create(req.body);
            if(alta){
                res.redirect('/static/');
            }
        }
        else{
            res.status(404).send("Ya existe un producto con ese codigo");
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error")
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