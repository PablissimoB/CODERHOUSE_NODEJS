import { ProductsServices } from "../services/products.services.js";

export async function getAll(req,res,next){
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
        const prods = await ProductsServices.paginar(criterio, opciones);
        res.status(200).send(prods);
    }
    catch(error){
        res.status(400).json({ message: error.message });        
    }
}


export async function getById(req,res,next){
    try {
    const { id } = req.params;
    const prod = await ProductsServices.getById(id);
    if (prod)
        res.status(200).send(prod);
    else
        res.status(404).send("Producto no existente");
    }
    catch (error) {
        next(error)
    }
}

export async function putById(req,res,next){
    const {id} = req.params;
    try{
        const actualizado = ProductsServices.putOne(id,req.body);
        res.status(200).send("Producto actualizado");
    }
    catch(error){
        res.status(404).send("El producto que trata de modificar no existe");
    }
}

export async function deleteById(req,res,next){
    const {id} = req.params;
    try{
        const actualizado = await ProductsServices.deleteOne(id);
        if(actualizado){
            res.status(200).send("Producto borrado");
        }
    }
    catch(error){
        res.status(404).send("El producto que trata de eliminar no existe");
    }
}



export async function post(req,res,next){
    try {
        const {code} = req.body;
        const Existe = await ProductsServices.getProduct(code);
        if(!Existe){
        const product = await ProductsServices.addProduct(req.body);
        res.redirect('/static/');
        }
        else{
            res.status(404).send("Ya existe un producto con ese codigo");
        }
    } catch (error) {
        next(error)
    }
}