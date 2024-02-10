import { cartModel } from "./carts.models.js";
import { toPOJO } from '../../utils/utils.js'

class CartDao {
    constructor(){
        this.cartModel = cartModel
    }
    async create(data){
      const cart = await cartModel.create(data)
      return cart.toObject()
    }

  
    async readById(cid){
        return toPOJO(await cartModel.findById(cid).populate('products._id').lean());
      }
    
      async paginates(criterio, opciones){
        return toPOJO(await cartModel.paginate(criterio, opciones))
      }

    async readOne(query) {
      return toPOJO(await cartModel.findOne(query).lean());
    }
  
    async readMany(query) {
      return toPOJO(await cartModel.find(query).lean());
    }
    
    async updateById(id,data){
        return toPOJO(await cartModel.findByIdAndUpdate(id,data).lean());
    }


    async updateOne(query, data) {
      return toPOJO(await cartModel.updateOne(query,data).lean());
    }
  
    async updateMany(query, data) {
      return toPOJO(await cartModel.updateMany(query,data).lean());
    }

    async deleteById(id){
        return toPOJO(await cartModel.findByIdAndDelete(id).lean());
    }
  
    async deleteOne(query) {
      return toPOJO(await cartModel.deleteOne(query).lean());
    }
  
    async deleteMany(query) {
      return toPOJO(await cartModel.deleteMany(query).lean());
    }
  }
  
  let cartDaoMongo
  export async function getCartDao(){
    if(!cartDaoMongo){
        cartDaoMongo = new CartDao();
    }
    return cartDaoMongo;
  }