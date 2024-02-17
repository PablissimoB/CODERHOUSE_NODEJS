import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { toPOJO } from '../../utils/utils.js'

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
  
