import { Router } from "express";
import { logger } from "../utils/logger.js";
import fs from 'fs/promises'

export const loggerRouter = Router()

async function readLogFile() {
    const logFilePath = 'C:\\Users\\Pablo\\Documents\\GitHub\\CODERHOUSE_NODE\\NodeJS-Entregables\\11\\logs\\errors.log'
    try {
      return await fs.readFile(logFilePath, 'utf8');
    } catch (err) {
      return `Error al leer el archivo ${logFilePath}: ${err.message}\n`;
    }
  }

loggerRouter.get('/', 
    async (req, res) => {
        const logs = await readLogFile();
        res.send(logs)
    }
)