import { model } from "mongoose"
import { cartSchema } from "./carts.models.js"
import { CartDao } from "./cart.dao.mongoose.js"

let daoCart

if(!daoCart){
    const cartModel = model('carts', cartSchema);
    daoCart = new CartDao(cartModel)
}

export async function getCartDao(){
    return daoCart;
  }