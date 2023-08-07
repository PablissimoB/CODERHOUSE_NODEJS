import express from 'express'
import {ProductManager as pm} from './script.js'

const productManager = new pm('src/base.txt');

const PORT = 8080;
const app = express();

app.get('/products', async (req, res) => {
    const {limit} = req.query
    const products = await productManager.getProducts()
    limit? res.send(products.filter(prod => prod.id <= limit)) : res.send(products) ;
})

app.get('/products/:pid', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.pid))
    console.log(product);
    res.send(product);
})

app.listen(PORT,() =>{
})