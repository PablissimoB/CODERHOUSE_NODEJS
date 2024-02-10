import { Router } from "express";
import {onlyRole} from '../../middlewares/authorization.js'
import { messageModel } from '../../dao/message/messages.models.js';
import { io } from "../../index.js";


export const messagesWebRouter = Router()


async function getMessages(){
    const response = await messageModel.find().lean();
    return response;
}

export let mensajes;


messagesWebRouter.get('/static/Chat', onlyRole('user'),  async (req, res) => {
    mensajes = await getMessages();
    res.render('chat', {
        messages : mensajes,
        js: 'messages.js'
    })
})