import { Router } from "express";
import { getByIdTicket, post } from "../../controllers/ticket.controller.js";

const ticketRouter = Router();

ticketRouter.get('/', getByIdTicket)
ticketRouter.post('/', post)

export default ticketRouter;