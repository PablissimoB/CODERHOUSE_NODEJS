import { promises as fs } from 'fs'

export class ProductManager {
    constructor(path){
        this.path = path;
    }

    async getProducts () {
        try{
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            return prods;
        }
        catch(error){
            console.error(error)
        }
    }

    async getProductById(id){
        try{
            const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            const producto = prods.find(prod => prod.id === id)
            return producto;
        }
        catch(error){
            console.error(error)
        }
    }

}