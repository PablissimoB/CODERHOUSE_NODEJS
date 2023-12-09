import express from 'express'
import prodsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import messageRouter from './routes/messages.routes.js';
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import mongoose from 'mongoose';
import userRouter from './routes/users.routes.js';
import { productModel } from './models/products.models.js';
import { cartModel } from './models/carts.models.js';
import { messageModel } from './models/messages.models.js';


const PORT = 4000;
const app = express();

const credential ='mongodb+srv://pablobobarini:Schumann141631@cluster0.tpb9icq.mongodb.net/?retryWrites=true&w=majority';
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

async function getCart(){
    const cart = await cartModel.findById('64fd09d885e276a633a2e8aa').lean();
    return cart;
}
async function getMessages(){
    const response = await messageModel.find().lean();
    return response;
}

let mensajes;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/api/carts', cartRouter);
app.use('/api/messages', messageRouter);

app.get('/static', async (req, res) => {
    let prods = await getProducts();
    const cart = await getCart();
    res.render('home', {
        products: prods,
        id_carrito : cart._id,
        js: 'main.js'
    })
})

app.get('/static/realtimeproducts', async (req, res) => {
    let prods = await getProducts();
    res.render('realtimeproducts', {
        products: prods,
        js: 'realTimeProducts.js'
    })
})

app.get('/static/Chat', async (req, res) => {
    mensajes = await getMessages();
    res.render('chat', {
        messages : mensajes,
        js: 'messages.js'
    })
})