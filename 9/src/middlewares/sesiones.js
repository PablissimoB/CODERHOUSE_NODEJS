import session from 'express-session'
import connectMongo from 'connect-mongo'
import {JWT_SECRET, cred} from '../config.js';

const store = connectMongo.create({
    mongoUrl: cred
});

export const sesiones = (session({
    store,
    secret: "'"+JWT_SECRET+"'",
    resave: false,
    saveUninitialized: false
}));
