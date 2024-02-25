import { Router } from "express";
import { getByIdTicket, post } from "../../controllers/ticket.controller.js";
import { manejoDeErrores } from "../../middlewares/manejoErrores.js";

const ticketRouter = Router();

ticketRouter.get('/:id', getByIdTicket)
ticketRouter.post('/', post)
ticketRouter.use(manejoDeErrores)

export default ticketRouter;