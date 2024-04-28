import dotenv from 'dotenv'

dotenv.config({
    path: './src/.env'
})

export const cred = process.env.cred
export const JWT_SECRET = process.env.JWT_SECRET
export const PORT = process.env.PORT
export const EMAIL_PASS = process.env.EMAIL_PASS
export const EMAIL_USER= process.env.EMAIL_USER