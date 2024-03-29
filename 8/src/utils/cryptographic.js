import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config.js"
import { hashSync, compareSync, genSaltSync } from 'bcrypt'

export function hash(frase) {
    if (!frase) throw new Error('cannot hash invalid parameter: ' + frase)
    return hashSync(frase, genSaltSync(10))
  }

  export function verifyHash(recibida, almacenada) {
    if (!recibida) throw new Error('cannot hash invalid parameter: ' + recibida)
    return compareSync(recibida, almacenada)
  }


export function encrypt(data){
    return new Promise((resolve, reject) => {
        if (!data) {
          const typedError = new Error('nothing to jwt encode!')
          typedError['type'] = 'INTERNAL_ERROR'
          return reject(typedError)
        }
        jwt.sign(data, JWT_SECRET, { expiresIn: '24h' }, (err, encoded) => {
          if (err) {
            const typedError = new Error(err.message)
            typedError['type'] = 'INTERNAL_ERROR'
            reject(typedError)
          } else {
            resolve(encoded)
          }
        })
      })
}

export function decrypt(token){
    return new Promise((resolve, reject) => {
        if (!token) {
          return reject(new Error('no token to decode!'))
        }
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
            reject(err)
          } else {
            resolve(decoded)
          }
        })
      })

}