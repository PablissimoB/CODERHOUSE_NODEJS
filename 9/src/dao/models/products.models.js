import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema ({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    thumbnail: [],
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    strict: 'throw',
    versionKey: false
}
    )
productSchema.plugin(mongoosePaginate)
export const productModel = model('products',productSchema);

class ProductDao {
    async create(data){
      const usuario = await productModel.create(data)
      return usuario.toObject()
    }
  
    async readById(id){
        return await productModel.findById(id).lean()
      }
    
      async paginates(criterio, opciones){
        return await productModel.paginate(criterio, opciones)
      }

    async readOne(query) {
      return await productModel.findOne(query).lean()
    }
  
    async readMany(query) {
      return await productModel.find(query).lean()
    }
  
    async updateOne(query, data) {
      return await productModel.updateOne(query,data).lean()
    }
  
    async updateMany(query, data) {
      return await productModel.updateMany(query,data).lean()
    }
  
    async deleteOne(query) {
      return await productModel.deleteOne(query).lean()
    }
  
    async deleteMany(query) {
      return await productModel.deleteMany(query).lean()
    }
  }
  
  let productDaoMongo
  export async function getProductDao(){
    if(!productDaoMongo){
        productDaoMongo = new ProductDao();
    }
    return productDaoMongo;
  }