
import { getCartDao } from "../dao/cart/cart.dao.js";

const cartsDao = await getCartDao();

class CartServices{
    async getCarts(){
        return await cartsDao.readMany();
    }

    async getById(id){
        return await cartsDao.readOne({_id:id});
    }

async paginar (criterio, opciones){
    return await cartsDao.paginates(criterio, opciones);
}

    async newCart(data){
        const cart = await cartsDao.create(data)
        return cart
    }

    async putOne(id,data){
        const cart = await cartsDao.updateById(id,data)
        return cart
    }

    async deleteOne(id){
        const cart = await cartsDao.deleteById(id)
        return cart
    }
}

export const cartsServices = new CartServices();