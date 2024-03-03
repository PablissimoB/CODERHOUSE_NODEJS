import { toPOJO } from '../../utils/utils.js'

export class CartDao {
    constructor(model){
        this.cartModel = model
    }
    async create(data){
      const cart = await this.cartModel.create(data)
      return cart.toObject()
    }

  
    async readById(cid){
        return toPOJO(await this.cartModel.findById(cid).populate('products._id').lean());
      }
    
      async paginates(criterio, opciones){
        return toPOJO(await this.cartModel.paginate(criterio, opciones))
      }

    async readOne(query) {
      return toPOJO(await this.cartModel.findOne(query).lean());
    }
  
    async readMany(query) {
      return toPOJO(await this.cartModel.find(query).lean());
    }
    
    async updateById(id,data){
        return toPOJO(await this.cartModel.findByIdAndUpdate(id,data).lean());
    }


    async updateOne(query, data) {
      return toPOJO(await this.cartModel.updateOne(query,data).lean());
    }
  
    async updateMany(query, data) {
      return toPOJO(await this.cartModel.updateMany(query,data).lean());
    }

    async deleteById(id){
        return toPOJO(await this.cartModel.findByIdAndDelete(id).lean());
    }
  
    async deleteOne(query) {
      return toPOJO(await this.cartModel.deleteOne(query).lean());
    }
  
    async deleteMany(query) {
      return toPOJO(await this.cartModel.deleteMany(query).lean());
    }
  }