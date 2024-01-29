import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: {
                    type: Number,
                }
            }
        ],
        default: [],
    }
});

export const cartModel = model('carts', cartSchema);

class CartDao {
    async create(data){
      const usuario = await cartModel.create(data)
      return usuario.toObject()
    }

  
    async readById(cid){
        return await cartModel.findById(cid).populate('products._id').lean();
      }
    
      async paginates(criterio, opciones){
        return await cartModel.paginate(criterio, opciones)
      }

    async readOne(query) {
      return await cartModel.findOne(query).lean()
    }
  
    async readMany(query) {
      return await cartModel.find(query).lean()
    }
    
    async updateById(id,data){
        return await cartModel.findByIdAndUpdate(id,data).lean();
    }


    async updateOne(query, data) {
      return await cartModel.updateOne(query,data).lean()
    }
  
    async updateMany(query, data) {
      return await cartModel.updateMany(query,data).lean()
    }

    async deleteById(id){
        return await cartModel.findByIdAndDelete(id).lean();
    }
  
    async deleteOne(query) {
      return await cartModel.deleteOne(query).lean()
    }
  
    async deleteMany(query) {
      return await cartModel.deleteMany(query).lean()
    }
  }
  
  let cartDaoMongo
  export async function getCartDao(){
    if(!cartDaoMongo){
        cartDaoMongo = new CartDao();
    }
    return cartDaoMongo;
  }