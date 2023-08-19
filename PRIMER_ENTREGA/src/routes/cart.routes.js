import { Router } from "express";
import {CartManager as cm} from '../cart_manager.js'

const cartRouter = Router()

const cartManager  = new cm('src/carrito.json');

cartRouter.get('/', async (req, res) => {
    const { limit } = req.query
    const prods = await cartManager.getProducts()
    const products = prods.slice(0, limit)
    res.status(200).send(products)
})

cartRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const prod = await cartManager.getProductById(parseInt(id))
    if (prod)
        res.status(200).send(prod)
    else
        res.status(404).send("Producto no existente")
})


export default cartRouter