import { getProductDao } from "../dao/product/products.dao.mongoose.js";

const productsDao = await getProductDao();

class ProductsService {
    async getProducts(){
        return await productsDao.readMany();
    }
    async getProduct(cod){
        return await productsDao.readOne({code: cod});
    }
    async getById(id){
        return await productsDao.readOne({_id: id});
    }

async paginar (criterio, opciones){
    return await productsDao.paginates(criterio, opciones);
}

    async addProduct(data){
        const product = await productsDao.create(data)
        return product
    }

    async putOne(id,data){
        const product = await productsDao.updateById(id,data)
        return product
    }

    async deleteOne(id){
        const product = await productsDao.deleteById(id)
        return product
    }
}



export const ProductsServices = new ProductsService();