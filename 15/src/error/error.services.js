class ErrorService{
    newError(tipo, message) {
        const error = new Error(message)
        error.name = tipo
        return error
      }
}

export const errorService = new ErrorService();