import { Router } from "express";
import { tokenizeUserInCookie } from '../../middlewares/token.js'
import passport from 'passport'
import { autenticar, deleteUser, get, getAllUsers, getUserToJson, postUser, updateUser } from "../../controllers/user.controller.js";
import {onlyRole} from '../../middlewares/authorization.js'
import { manejoDeErrores } from "../../middlewares/manejoErrores.js";

const userRouter = Router()

userRouter.get('/',passport.authenticate('jwt', { failWithError: true, session: false }),onlyRole(['admin']),getAllUsers)
userRouter.get('/current',passport.authenticate('jwt', { failWithError: true, session: false }),autenticar)
userRouter.get('/:id', get)
userRouter.post('/', postUser,tokenizeUserInCookie,getUserToJson)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.use(manejoDeErrores)

export default userRouter