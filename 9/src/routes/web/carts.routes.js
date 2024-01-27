import { Router } from "express";
import {onlyRole} from '../../middlewares/authorization.js'
import { cartModel } from '../../dao/carts.models.js';

export const cartsWebRouter = Router()

async function getCart(cid){
    try{
        const cart = await cartModel.findById(cid).populate('products._id').lean();
        return cart;
    }
    catch(error){
        console.log(error)
    }
}

cartsWebRouter.get('/static/cart/:cid', onlyRole('user'),   async (req, res) => {
    const cid = req.params.cid;
    const cart = await getCart(cid);
    res.render('cart', {
        cart : cart,
        js: 'cart.js'
    })
})