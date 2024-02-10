import { Router } from "express";
import { userModel } from "../../dao/user/users.models.js";
import { tokenizeUserInCookie } from '../../middlewares/token.js'
import passport from 'passport'
import { get } from "../../controllers/user.controller.js";
import { usersServices } from "../../services/users.services.js";
import { toPOJO } from "../../utils/utils.js";

const userRouter = Router()

userRouter.get('/', async (req, res) => {
    passport.authenticate('jwt', { failWithError: true, session: false }),
        soloRoles(['admin']),
        async (req, res, next) => {
            try {
                const users = await userModel.find().lean()
                res.json(users)
            } catch (error) {
                next(error)
            }
        }

})

userRouter.get('/current',
    passport.authenticate('jwt', { failWithError: true, session: false }),
    async (req, res) => {
        const { user } = req;
        const { cart, email, role, first_name, last_name } = user;
        const responseObject = { cart, email, role, first_name, last_name };
        res.json(toPOJO(responseObject))
    }
)

userRouter.get('/:id', get)

userRouter.post('/', async (req, res) => {
    try {
        const user = await usersServices.addUser(req.body)
        req.user = user
        res.status(201).json({
            status: 'success',
            payload: user.toObject(),
            token
        });
    }
    catch (error) {
        res.status(400).send({ mensaje: error });
    }
},
    tokenizeUserInCookie,
    (req, res) => {
        res.json(req.user)
    }
)

userRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, role, email, password } = req.body
    const users = await userModel.findByIdAndUpdate(id, { first_name, last_name, role, email, password });
    try {
        if (users) {
            res.status(200).send(users);
        }
        else {
            res.status(404).send("Usuario no existente");
        }
    }
    catch (error) {
        res.status(400).send({ mensaje: error });
    }
})


userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const users = await userModel.findByIdAndDelete(id);
    try {
        if (users) {
            res.status(200).send(users);
        }
        else {
            res.status(404).send("Usuario no existente");
        }
    }
    catch (error) {
        res.status(400).send({ mensaje: error });
    }
})
export default userRouter