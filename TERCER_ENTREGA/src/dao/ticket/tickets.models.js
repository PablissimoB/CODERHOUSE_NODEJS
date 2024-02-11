import {Schema, model} from "mongoose"
import { randomUUID } from 'node:crypto'

const TicketSchema = new Schema ({
    code: {
        type: String,
        default: randomUUID()
    },
    purchase_datetime:{
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String
    }
}, {
    strict: 'throw',
    versionKey: false
})
export const ticketModel = model('ticket',TicketSchema);
