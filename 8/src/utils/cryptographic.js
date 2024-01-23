import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config.js"

export function encrypt(code){
    return new Promise ((res, rej) => {
        if(!code){
            rej(new Error('no data sended'));
        }
        else{
            jwt.sign(code,JWT_SECRET, (error, encoded) => {
                if(error){
                    rej(error);
                }
                else{
                    res(encoded);
                }
            })
        }
    });
}

export function decrypt(code){
    return new Promise ((res, rej) => {
        if(!code){
            rej(new Error('no data sended'));
        }
        else{
            jwt.verify(code,JWT_SECRET, (error, decoded) =>{
                if(error){
                    rej(error)
                }
                else{
                    res(decoded)
                }
            })
        }
    });
}