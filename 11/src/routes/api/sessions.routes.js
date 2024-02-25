import { Router } from "express";
import {deleteTokenFromCookie, tokenizeUserInCookie} from '../../middlewares/token.js'
import { authenticateUserSession } from "../../controllers/user.controller.js";


const sessionsRouter = Router()


sessionsRouter.post('/', authenticateUserSession,  tokenizeUserInCookie,
  (req, res) => {
    res.sendStatus(201)
  }
)

sessionsRouter.delete('/current',  deleteTokenFromCookie,
  (req, res) => {
    res.sendStatus(204)
  }
)


export default sessionsRouter