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