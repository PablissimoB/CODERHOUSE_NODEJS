import { encrypt } from '../utils/cryptographic.js';

const cookieOpts = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24, 
  signed: true
};

  
  export async function tokenizeUserInCookie(req, res, next) {
    try {
      const token = await encrypt(req.user);
      if(token){
        res.cookie('authorization', token, cookieOpts);
        next();
      }
    } catch (error) {
      next(error);
    }
  }
  


  export function deleteTokenFromCookie(req, res, next) {
    res.clearCookie('authorization')
    next()
  }