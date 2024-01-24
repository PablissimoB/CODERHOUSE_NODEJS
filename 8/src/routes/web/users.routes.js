import { Router } from "express";
import {onlyLogueadosWeb} from '../../middlewares/auth.js'

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
usersWebRouter.get('/static/userProfile', onlyLogueadosWeb, async (req, res) => {
    res.render('userProfile', {
        ...req.session['user'],
        js: 'userProfile.js'
    })
})
