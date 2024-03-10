import dotenv from 'dotenv'

dotenv.config({
    path: './src/.env'
})

export const NODE_ENV = process.env.NODE_ENV
export const cred = process.env.cred
export const JWT_SECRET = process.env.JWT_SECRET
export const PORT = process.env.PORT
export const logLevel = {
    CONSOLE: NODE_ENV === 'production' ? 'info' : '',
    FILE: NODE_ENV === 'development' ? 'debug' : ''
}
export const SWAGGER_CONFIG = {
    definition: {
      openapi: '3.0.1',
      info: {
        version: '1',
        title: 'Swagger',
        description: ''
      }
    },
    apis: ['./docs/**/*.yaml']
  }