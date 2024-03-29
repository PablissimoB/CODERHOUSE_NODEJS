import { Schema, model } from "mongoose";

export const cartSchema = new Schema({
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
