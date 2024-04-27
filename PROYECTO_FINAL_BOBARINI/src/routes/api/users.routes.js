import { Router } from "express";
import { tokenizeUserInCookie } from '../../middlewares/token.js'
import passport from 'passport'
import { autenticar, deleteUsers, deleteUser, get, getAllUsers, getUserToJson, postUser, updateUser } from "../../controllers/user.controller.js";
import {onlyRole} from '../../middlewares/authorization.js'

const userRouter = Router()

userRouter.get('/',getAllUsers)
userRouter.get('/current',passport.authenticate('jwt', { failWithError: true, session: false }),autenticar)
userRouter.get('/:id',passport.authenticate('jwt', { failWithError: true, session: false }), get)
userRouter.post('/', postUser,tokenizeUserInCookie,getUserToJson)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)
userRouter.delete('/', deleteUsers)

export default userRouter