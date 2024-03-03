import { Router } from "express";
import {onlyRole} from '../../middlewares/authorization.js'
import { decrypt } from '../../utils/cryptographic.js';

export const usersWebRouter = Router()

//register
usersWebRouter.get('/static/userRegister', async (req, res) => {
    res.render('userRegister', {
        js: 'userRegister.js'
    })
})

//login
usersWebRouter.get('/static/userLogin', async (req, res) => {
    res.render('userLogin', {
        js: 'userLogin.js'
    })
})

//profile
usersWebRouter.get('/static/userProfile', onlyRole('both'),  async (req, res) => {
    res.render('userProfile', {
        ... await decrypt(req.signedCookies['authorization']),
        js: 'userProfile.js'
    })
})
