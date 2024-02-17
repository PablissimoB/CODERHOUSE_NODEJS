
import { decrypt } from '../utils/cryptographic.js';

//Autorizacion
export function onlyRole(roles){
    return async function (req, res, next) {

        const rol = req.signedCookies['authorization'];
        if(!rol){
            return res.redirect('/static/UserLogin')
        }
        else{
            const decrypteUser = await decrypt(rol);
            if (roles == decrypteUser.role || roles == 'both') {
                next();
              } else {
                return res.redirect('/static/Error')
              }
        }
        
      };
  }
   