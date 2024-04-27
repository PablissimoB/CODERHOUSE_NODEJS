import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import {JWT_SECRET} from '../config.js';

  //Autenticacion
  passport.use('jwt', new JwtStrategy(
    {
      jwtFromRequest: function (req) {
        let token = null
        if (req?.signedCookies) {
          token = req.signedCookies['authorization']
        }
        return token
      },
      secretOrKey: "'"+JWT_SECRET+"'",
    },
    (user, done) => {
      done(null, user)
    }
  ))
  
  export const authentication = passport.initialize();