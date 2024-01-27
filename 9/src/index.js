import { PORT } from './config.js';
import { __dirname } from './path.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { messageModel } from './dao/messages.models.js';
import { cred} from './config.js';
import {onlyRole} from './middlewares/authorization.js'
import { app } from './app/app.js';


const credential = cred;
mongoose.connect(credential,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('conectado con Base'))
.catch(() => console.log('error en Base'));
const serverExpress = app.listen(PORT, () => {
})

// async function getProducts(){
//     const resultado = await productModel.find({}).lean();
//     return resultado;
// }

// async function getProductById(id){
//     const resultado = await productModel.findById({_id:id}).lean();
//     return resultado;
// }


async function getMessages(){
    const response = await messageModel.find().lean();
    return response;
}

let mensajes;


const io = new Server(serverExpress)
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado");
    socket.on('mensaje', (infoMensaje) => {
        mensajes.push(infoMensaje);
        socket.emit('mensajes', mensajes)
    })
})


app.get('/static/Error', async (req, res) => {
    res.render('error', {
        js: 'error.js'
    })
})

// app.get('/static', onlyRole('both'),  async (req, res) => {
//     let prods = await getProducts();
//     res.render('home', {
//         products: prods,
//         ...req.session['user'],
//         js: 'main.js'
//     })
// })


// app.get('/static/product/:pid', onlyRole('user'), async (req, res) => {
//     const pid = req.params.pid;
//     if(pid){
//         let prod = await getProductById(pid);
//         res.render('product', {
//             product: prod,
//             js: 'product.js'
//         })
//     }
//     else{
//         res.status(404).send("Producto inexistente");
//     }
    
// })

// app.get('/static/realtimeproducts', onlyRole('admin'),   async (req, res) => {
//     let prods = await getProducts();
//     res.render('realtimeproducts', {
//         products: prods,
//         js: 'realTimeProducts.js'
//     })
// })


app.get('/static/Chat', onlyRole('user'),  async (req, res) => {
    mensajes = await getMessages();
    res.render('chat', {
        messages : mensajes,
        js: 'messages.js'
    })
})