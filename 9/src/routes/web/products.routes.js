import { productModel } from '../../dao/products.models.js';
import { Router } from "express";
import {onlyRole} from '../../middlewares/authorization.js'

export const productsWebRouter = Router()

async function getProducts(){
    const resultado = await productModel.find({}).lean();
    return resultado;
}

async function getProductById(id){
    const resultado = await productModel.findById({_id:id}).lean();
    return resultado;
}

productsWebRouter.get('/static', onlyRole('both'),  async (req, res) => {
    let prods = await getProducts();
    res.render('home', {
        products: prods,
        ...req.session['user'],
        js: 'main.js'
    })
})


productsWebRouter.get('/static/product/:pid', onlyRole('user'), async (req, res) => {
    const pid = req.params.pid;
    if(pid){
        let prod = await getProductById(pid);
        res.render('product', {
            product: prod,
            js: 'product.js'
        })
    }
    else{
        res.status(404).send("Producto inexistente");
    }
    
})

productsWebRouter.get('/static/realtimeproducts', onlyRole('admin'),   async (req, res) => {
    let prods = await getProducts();
    res.render('realtimeproducts', {
        products: prods,
        js: 'realTimeProducts.js'
    })
})
