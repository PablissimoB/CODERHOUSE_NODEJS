import { Router } from "express";
import {onlyRole} from '../../middlewares/authorization.js'
import axios from 'axios';
import { decrypt } from '../../utils/cryptographic.js';

export const cartsWebRouter = Router()

cartsWebRouter.get('/static/cart/', onlyRole('user'),   async (req, res) => {
    const user = await decrypt(req.signedCookies['authorization']);
    const cart = await axios.get('http://localhost:4000/api/carts/'+user.current_cart);
    res.render('cart', {
        ... user,
        cart : cart.data,
        js: 'cart.js'
    })
})