import { logger } from "../utils/logger"


export function httpLogger(req, res, next) {
    logger.http(`[${req.method}] ${req.url}`)
    next()
  }