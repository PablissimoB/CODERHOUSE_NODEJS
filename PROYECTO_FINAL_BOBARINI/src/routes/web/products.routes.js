import { Router } from "express";
import {onlyRole, twoRole} from '../../middlewares/authorization.js';
import { decrypt } from '../../utils/cryptographic.js';
import axios from 'axios';

export const productsWebRouter = Router()

productsWebRouter.get('/static', onlyRole('both'),  async (req, res) => {
    const prods = await axios.get('http://localhost:4000/api/products');

    res.render('home', {
        products: prods.data.docs,
        ... await decrypt(req.signedCookies['authorization']),
        ...req.session['user'],
        js: 'main.js'
    })
})

productsWebRouter.get('/static/product/:pid', onlyRole('both'), async (req, res) => {
    const pid = req.params.pid;
    if(pid){
        let prod = await axios.get('http://localhost:4000/api/products/'+pid);
        res.render('product', {
            product: prod.data,
            ... await decrypt(req.signedCookies['authorization']),
            js: 'product.js'
        })
    }
    else{
        res.status(404).send("Producto inexistente");
    }
    
})

productsWebRouter.get('/static/realtimeproducts', twoRole('admin','premium'),   async (req, res) => {
    let prods = await axios.get('http://localhost:4000/api/products');
    res.render('realtimeproducts', {
        products: prods.data.docs,
        js: 'realTimeProducts.js'
    })
})
