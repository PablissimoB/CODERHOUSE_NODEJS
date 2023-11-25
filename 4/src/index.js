import express from 'express'
import prodsRouter from "./routes/products.routes.js";
import { __dirname } from './path.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import {ProductManager as pm} from './product_manager.js';

const productManager = new pm('src/productos.json');

const PORT = 4000;
const app = express();
const serverExpress = app.listen(PORT, () => {
})
let prods = await productManager.getProducts();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));
app.use('/static', express.static(path.join(__dirname, '/public')));


const io = new Server(serverExpress)
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado");
    
    socket.on('nuevoProducto', async (nuevoProd) =>{
        const product = await productManager.addProduct(nuevoProd);
        let id = 1;
        prods.forEach(element => {
        element.id >= 1 ? id = element.id + 1 : id;})

        nuevoProd.id =id;
        prods.push(nuevoProd);
        socket.emit('prods',prods);
    })
    
    socket.on('eliminarProducto', async (id) =>{
        const deleteProduct = await productManager.deleteProduct(id);
        prods = prods.filter(product => product.id != id);
        socket.emit('prods',prods);
    })

})

app.use('/api/products', prodsRouter);

app.get('/static', (req, res) => {
    res.render('home', {
        products: prods,
        js: 'main.js'
    })
})

app.get('/static/realtimeproducts', (req, res) => {
    res.render('realtimeproducts', {
        products: prods,
        js: 'realTimeProducts.js'
    })
})
