import { PORT } from './config.js';
import { __dirname } from './path.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { cred} from './config.js';
import { app } from './app/app.js';
import { mensajes } from './routes/web/messages.routes.js';


const credential = cred;
mongoose.connect(credential,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('conectado con Base'))
.catch(() => console.log('error en Base'));
const serverExpress = app.listen(PORT, () => {
})

// async function getMessages(){
//     const response = await messageModel.find().lean();
//     return response;
// }

// let mensajes;


export const io = new Server(serverExpress)

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


// app.get('/static/Chat', onlyRole('user'),  async (req, res) => {
//     mensajes = await getMessages();
//     res.render('chat', {
//         messages : mensajes,
//         js: 'messages.js'
//     })
// })