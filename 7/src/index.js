import express from 'express'
import cookieParser from 'cookie-parser'
import {sesiones} from './middlewares/sesiones.js'
import prodsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import messageRouter from './routes/messages.routes.js';
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import mongoose from 'mongoose';
import userRouter from './routes/users.routes.js';
import sessionsRouter from './routes/sessions.routes.js';
import { productModel } from './models/products.models.js';
import { cartModel } from './models/carts.models.js';
import { messageModel } from './models/messages.models.js';
import { cred} from './config.js';
import {onlyLogueadosWeb} from './middlewares/auth.js'


const PORT = 4000;
const app = express();

const credential = cred;
mongoose.connect(credential,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('conectado con Base'))
.catch(() => console.log('error en Base'));
const serverExpress = app.listen(PORT, () => {
})

async function getProducts(){
    const resultado = await productModel.find({}).lean();
    return resultado;
}

async function getProductById(id){
    const resultado = await productModel.findById({_id:id}).lean();
    return resultado;
}


async function getCart(cid){
    try{
        const cart = await cartModel.findById(cid).populate('products._id').lean();
        return cart;
    }
    catch(error){
        console.log(error)
    }
}
async function getMessages(){
    const response = await messageModel.find().lean();
    return response;
}

let mensajes;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sesiones);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));
app.use('/static', express.static(path.join(__dirname, '/public')));


const io = new Server(serverExpress)
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado");
    socket.on('mensaje', (infoMensaje) => {
        mensajes.push(infoMensaje);
        socket.emit('mensajes', mensajes)
    })
})

app.use(express.urlencoded({ extended: true }));
app.use('/api/products', prodsRouter);
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/messages', messageRouter);

app.get('/static', onlyLogueadosWeb , async (req, res) => {
    let prods = await getProducts();
    res.render('home', {
        products: prods,
        ...req.session['user'],
        js: 'main.js'
    })
})

app.get('/static/cart/:cid',  async (req, res) => {
    const cid = req.params.cid;
    const cart = await getCart(cid);
    res.render('cart', {
        cart : cart,
        js: 'cart.js'
    })
})

app.get('/static/product/:pid', onlyLogueadosWeb, async (req, res) => {
    const pid = req.params.pid;
    if(pid){
        let prod = await getProductById(pid);
        res.render('product', {
            product: prod,
            js: 'product.js'
        })
    }
    else{
        res.status(404).send("Producto inexistente");
    }
    
})

app.get('/static/realtimeproducts', onlyLogueadosWeb, async (req, res) => {
    let prods = await getProducts();
    res.render('realtimeproducts', {
        products: prods,
        js: 'realTimeProducts.js'
    })
})

app.get('/static/userRegister', async (req, res) => {
    res.render('userRegister', {
        js: 'userRegister.js'
    })
})

app.get('/static/userLogin', async (req, res) => {
    res.render('userLogin', {
        js: 'userLogin.js'
    })
})

app.get('/static/userProfile', onlyLogueadosWeb, async (req, res) => {
    res.render('userProfile', {
        ...req.session['user'],
        js: 'userProfile.js'
    })
})

app.get('/static/Chat', onlyLogueadosWeb, async (req, res) => {
    mensajes = await getMessages();
    res.render('chat', {
        messages : mensajes,
        js: 'messages.js'
    })
})