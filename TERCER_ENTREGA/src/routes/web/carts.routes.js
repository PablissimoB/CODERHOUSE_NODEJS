import { Router } from "express";
import {onlyRole} from '../../middlewares/authorization.js'
import axios from 'axios';

export const cartsWebRouter = Router()

cartsWebRouter.get('/static/cart/:cid', onlyRole('user'),   async (req, res) => {
    const cid = req.params.cid;
    const cart = await axios.get('http://localhost:4000/api/carts/'+cid);
    res.render('cart', {
        cart : cart.data,
        js: 'cart.js'
    })
})