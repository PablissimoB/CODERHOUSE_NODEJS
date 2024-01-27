import { Router } from "express";
import { userModel } from "../../dao/users.models.js";
import {deleteTokenFromCookie, tokenizeUserInCookie} from '../../middlewares/token.js'

const sessionsRouter = Router()

sessionsRouter.post('/',
  async (req, res, next) => {
    try {
      const user = await userModel.autenticar(req.body)
      req.user = user
      next()
    } catch (error) {
      next(error)
    }
  },
  tokenizeUserInCookie,
  (req, res) => {
    res.sendStatus(201)
  }
)

sessionsRouter.delete('/current',
  deleteTokenFromCookie,
  (req, res) => {
    res.sendStatus(204)
  }
)


export default sessionsRouter