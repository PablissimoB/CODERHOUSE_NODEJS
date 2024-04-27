import { Router } from "express";
import {onlyRole} from '../../middlewares/authorization.js'
import { decrypt } from '../../utils/cryptographic.js';
import axios from 'axios';

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

//profiles
usersWebRouter.get('/static/userProfiles', onlyRole('admin'),  async (req, res) => {
    const users = await axios.get('http://localhost:4000/api/users');

    res.render('userProfiles', {
        usuarios: users.data,
        js: 'userProfiles.js'
    })
})