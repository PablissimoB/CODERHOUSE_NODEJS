import winston from 'winston'
import { NODE_ENV, logLevel } from '../config.js'

export let logger
export let listLogs =[]
if(NODE_ENV === 'development' ){
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: logLevel.CONSOLE }),
        ]
    })
}
else{
    logger = winston.createLogger({
        transports: [
            new winston.transports.File({ level: logLevel.FILE , filename: './logs/errors.log' })
        ]
    })
}

export function addLoggerHistorial(log){
    listLogs.push(log)
}