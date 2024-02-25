import { toPOJO } from '../../utils/utils.js'
import { productModel } from './products.models.js';

export class ProductDao {
    constructor(){
        this.productModel = productModel;
    }

    async create(data){
      const product = await this.productModel.create(data);
      return product.toObject();
    }
  
    async readById(id){
        return toPOJO(await this.productModel.findById(id).lean());
      }
    
      async paginates(criterio, opciones){
        return toPOJO(await this.productModel.paginate(criterio, opciones));
      }

    async readOne(query) {
      return toPOJO(await this.productModel.findOne(query).lean());
    }
  
    async readMany(query) {
      return toPOJO(await this.productModel.find(query).lean());
    }
    
    async updateById(id,data){
        return toPOJO(await this.productModel.findByIdAndUpdate(id,data).lean());
    }


    async updateOne(query, data) {
      return toPOJO(await this.productModel.updateOne(query,data).lean());
    }
  
    async updateMany(query, data) {
      return toPOJO(await this.productModel.updateMany(query,data).lean());
    }

    async deleteById(id){
        return toPOJO(await this.productModel.findByIdAndDelete(id).lean());
    }
  
    async deleteOne(query) {
      return toPOJO(await this.productModel.deleteOne(query).lean());
    }
  
    async deleteMany(query) {
      return toPOJO(await this.productModel.deleteMany(query).lean());
    }
  }

  let productDaoMongo
  export async function getProductDao(){
    if(!productDaoMongo){
        productDaoMongo = new ProductDao();
    }
    return productDaoMongo;
  }