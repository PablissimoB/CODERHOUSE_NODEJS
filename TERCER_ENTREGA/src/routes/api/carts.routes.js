import { Router } from "express";
import { addProductToCart, emptyCart, getAll, modifyCart, modifyProductQuantityCart, post, purchase, substractProductToCart } from "../../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.get('/:cid', getAll)
cartRouter.post('/',post)
cartRouter.post('/:cid/purchase',purchase)
cartRouter.post('/:cid/products/:pid', addProductToCart)
cartRouter.delete('/:cid/products/:pid', substractProductToCart)
cartRouter.delete('/:cid', emptyCart)
cartRouter.put('/:cid', modifyCart)
cartRouter.put('/:cid/products/:pid', modifyProductQuantityCart)


export default cartRouter