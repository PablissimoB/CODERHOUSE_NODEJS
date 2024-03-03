import { ErrorType } from "../error/enum.js"

export function manejoDeErrores(error, req, res, next) {
    switch (error.name) {
      case ErrorType.INVALID_DATA:
        res.status(400)
        break
      case ErrorType.NOT_FOUND:
        res.status(404)
        break
      case ErrorType.POST_ERROR:
        res.status(404)
        break
      case ErrorType.DELETE_ERROR:
        res.status(404)
        break
      case ErrorType.UPDATE_ERROR:
        res.status(404)        
        break
      case ErrorType.SERVER_ERROR:
        res.status(500)
        break
      default:
        res.status(500)
    }
    res.json({
      status: 'error',
      message: error.message
    })
  }