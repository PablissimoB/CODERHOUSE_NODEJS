import { Router } from "express";
import { userModel } from "../../dao/users.models.js";
import { encrypt } from "../../utils/cryptographic.js";
import { tokenizeUserInCookie } from '../../middlewares/token.js'
import passport from 'passport'

const userRouter = Router()

userRouter.get('/', async (req, res) => {
    passport.authenticate('jwt', { failWithError: true, session: false }),
        soloRoles(['admin']),
        async (req, res, next) => {
            try {
                const users = await userModel.find().lean()
                res.jsonOk(users)
            } catch (error) {
                next(error)
            }
        }

})

userRouter.get('/current',
    passport.authenticate('jwt', { failWithError: true, session: false }),
    async (req, res, next) => {
        res.jsonOk(req.user)
    }
)

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const users = await userModel.findById(id);
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

userRouter.post('/', async (req, res) => {
    try {
        const user = await userModel.register(req.body)
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
        res.jsonOk(req.user)
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