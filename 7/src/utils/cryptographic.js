import { hashSync, compareSync, genSaltSync } from "bcrypt";

export function doHash(code){
    return hashSync(code, genSaltSync(12));
}

export function verifyHash(sended, base){
    return compareSync(sended,base);
}