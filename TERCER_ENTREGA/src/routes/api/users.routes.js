import { Router } from "express";
import { userModel } from "../../dao/user/users.models.js";
import { tokenizeUserInCookie } from '../../middlewares/token.js'
import passport from 'passport'
import { autenticar, get, getAllUsers, getUserToJson, postUser } from "../../controllers/user.controller.js";
import {onlyRole} from '../../middlewares/authorization.js'

const userRouter = Router()

userRouter.get('/', 
    passport.authenticate('jwt', { failWithError: true, session: false }),
    onlyRole(['admin']),
    getAllUsers
)

userRouter.get('/current',
    passport.authenticate('jwt', { failWithError: true, session: false }),
    autenticar
)
userRouter.get('/:id', get)

userRouter.post('/', postUser,
    tokenizeUserInCookie,
    getUserToJson
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