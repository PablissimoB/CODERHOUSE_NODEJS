import { Router } from "express";
import {onlyRole, twoRole} from '../../middlewares/authorization.js'
import axios from 'axios';
import { decrypt } from '../../utils/cryptographic.js';

export const cartsWebRouter = Router()

cartsWebRouter.get('/static/cart/', twoRole('user','premium'),   async (req, res) => {
    const user = await decrypt(req.signedCookies['authorization']);
    const cart = await axios.get('http://localhost:4000/api/carts/'+user.current_cart);
    res.render('cart', {
        ... user,
        cart : cart.data,
        js: 'cart.js'
    })
})

cartsWebRouter.get('/static/success/', twoRole('user','premium'),   async (req, res) => {
    const user = await decrypt(req.signedCookies['authorization']);
    const cart = await axios.get('http://localhost:4000/api/carts/'+user.current_cart);
    const ticket = await axios.post('http://localhost:4000/api/carts/'+user.current_cart+'/purchase', {email: user.email,_id: user._id });

    res.render('success', {
        ... user,
        ticket: ticket.data,
        cart : cart.data,
        js: 'success.js'
    })
})