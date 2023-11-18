import { promises as fs } from 'fs'
import { Cart, Product } from './models/cart.js'
import { randomUUID } from 'node:crypto'

export class CartManager {
    constructor(path){
        this.path = path;
    }

    //Obtener carrito por id
    async getCartById(id){
        try{
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const cart = carts.find(cart => cart.id === id)
            if(cart){
                return cart;
            }
            else{
                return null;
            }
        }
        catch(error){
            console.error(error)
        }
    }

    //Crear carrito
    async addCart(body) {
        try{
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const id = randomUUID();
            let cart;
            if(body.products){
                cart = new Cart(
                    id, body.products
                )
            }
            else{
                cart = new Cart(
                    id, []
                )
            }
            carts.push(cart);
            fs.writeFile(this.path, JSON.stringify(carts));
        }
        catch(error){
            console.error(error)
        }
    }

    //Agregar productos al carrito
    async addProductToCart(cid, pid) {
        try{
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const cartsAux = carts.filter(cart => cart.id != cid);
            const cart = carts.find(cart => cart.id == cid);
            if(cart){
                if(cart.products.length != 0){
                    const prodsAux = cart.products.filter(product => product.id != pid);
                    const productAdded = cart.products.find(product => product.id == pid);
                    if(productAdded === undefined){
                        const productToAdd = new Product(pid,1);
                        prodsAux.push(productToAdd);
                    }
                    else{
                        let productToAdd = new Product(pid,productAdded.quantity);
                        productToAdd.quantity = productAdded.quantity +1;
                        prodsAux.push(productToAdd);
                    }
                    cart.products = prodsAux;
                }
                else{
                    let productToAdd = new Product(pid,1)
                    cart.products.push(productToAdd)
                }
                cartsAux.push(cart);
                fs.writeFile(this.path, JSON.stringify(cartsAux));
            }
            else{
                return null;
            }
        }
        catch(error){
            console.error(error)
        }
    }
}