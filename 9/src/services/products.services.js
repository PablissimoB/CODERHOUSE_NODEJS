import { getProductDao } from "../dao/models/products.models.js";

const productsDao = await getProductDao();

class ProductsService {
    async getProducts(){
        return await productsDao.readMany();
    }
    async getProduct(cod){
        return await productsDao.readOne({code: cod});
    }
    async getById(id){
        return await productsDao.readById(id);
    }

async paginar (criterio, opciones){
    return await productsDao.paginates(criterio, opciones);
}

    async addProduct(data){
        const product = await productsDao.create(data)
        return product
    }
}

export const ProductsServices = new ProductsService();