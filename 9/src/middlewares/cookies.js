import cookieParser from 'cookie-parser'
import {JWT_SECRET} from '../config.js';

export const cookies = cookieParser(JWT_SECRET);