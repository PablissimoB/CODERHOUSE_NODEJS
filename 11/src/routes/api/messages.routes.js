import { Router } from "express";
import { getAll, post } from "../../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get('/', getAll)
messageRouter.post('/', post)

export default messageRouter;