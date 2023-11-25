import { promises as fs } from 'fs'
import { Product } from './models/product.js'
import { randomUUID } from 'node:crypto'

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            return prods;
        }
        catch (error) {
            console.error(error)
        }
    }

    async getProductById(id) {
        try{
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const producto = prods.find(prod => prod.id === id)
            if (producto) {
                return producto;
            }
            else {
                return null;
            }
        }
        catch(error){
            console.error(error)
        }
        
    }

    async addProduct(body) {
        try{
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const id = randomUUID();
            const product = new Product(
                id, body.title, body.description, body.price, body.thumbnail, body.code, body.stock, body.category
            )
            products.push(product);
            fs.writeFile(this.path, JSON.stringify(products));
        }
        catch(error){
            console.error(error)
        }
        
    }

    async updateProduct(id, body) {
        try{
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const productsUpdated = products.filter(product => product.id != id);
            const result = products.find(product => product.id == id);
            result.title = body.title;
            result.description = body.description;
            result.price = body.price;
            result.thumbnail = body.thumbnail;
            result.stock = body.stock;
            result.category = body.category
            productsUpdated.push(result);
            fs.writeFile(this.path, JSON.stringify(productsUpdated));
        }
        catch(error){
            console.error(error)
        }
        
    }

    async deleteProduct(id) {
        try{
            const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            const result = products.filter(product => product.id != id);
            fs.writeFile(this.path, JSON.stringify(result));
        }
        catch(error){
            console.error(error)
        }
        
    }

    async verifyCode(code) {
        try {
            const arrayOfProducts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            let result = true;
            if (arrayOfProducts.length > 0) {
                arrayOfProducts.forEach(item => {
                    result = item.code == code ? false : true;
                });
            }
            return result;
        }
        catch(error){
            console.error(error)
        }
        
    }

    readProducts() {
        try{
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        }
        catch(error){
            console.error(error)
        }
    }
}