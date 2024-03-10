import express from 'express'
import {authentication} from '../middlewares/authentication.js'
import { usersWebRouter } from '../routes/web/users.routes.js';
import { cookies } from '../middlewares/cookies.js';
import cookieParser from 'cookie-parser'
import {sesiones} from '../middlewares/sesiones.js'
import userRouter from '../routes/api/users.routes.js';
import sessionsRouter from '../routes/api/sessions.routes.js';
import prodsRouter from "../routes/api/products.routes.js";
import cartRouter from "../routes/api/carts.routes.js";
import messageRouter from '../routes/api/messages.routes.js';
import { engine } from 'express-handlebars';
import path from 'path';
import { JWT_SECRET, SWAGGER_CONFIG } from '../config.js';
import { __dirname } from '../path.js';
import { cartsWebRouter } from '../routes/web/carts.routes.js';
import { productsWebRouter } from '../routes/web/products.routes.js';
import { messagesWebRouter } from '../routes/web/messages.routes.js';
import ticketRouter from '../routes/api/tickets.routes.js';
import { loggerRouter } from '../test/logger.test.js';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { spawn } from 'child_process';

export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("'"+JWT_SECRET+"'"));
app.use(sesiones);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));
app.use('/static', express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookies)
app.use(authentication)
app.use('/api/products', prodsRouter);
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/messages', messageRouter);
app.use('/api/tickets', ticketRouter);
app.use('/loggerTest', loggerRouter);
app.use('/',usersWebRouter);
app.use('/',cartsWebRouter);
app.use('/',productsWebRouter);
app.use('/',messagesWebRouter);
const specs = swaggerJSDoc(SWAGGER_CONFIG)

app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));