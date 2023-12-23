import session from 'express-session'
import connectMongo from 'connect-mongo'
import { cred} from './config.js';

const store = connectMongo.create({
    mongoUrl:cred
});

export const sesiones = (session({
    store,
    secret: 'coder',
    resave: false,
    saveUninitialized: false
}));
