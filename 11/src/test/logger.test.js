import { Router } from "express";
import { listLogs } from "../utils/logger.js";

export const loggerRouter = Router()

loggerRouter.get('/', 
    async (req, res) => {
        res.send(listLogs)
    }
)