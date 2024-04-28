import { Router } from "express";
import {onlyRole, twoRole} from '../../middlewares/authorization.js'
import { messageModel } from '../../dao/message/messages.models.js';
import { decrypt } from '../../utils/cryptographic.js';


export const messagesWebRouter = Router()


async function getMessages(){
    const response = await messageModel.find().lean();
    return response;
}

export let mensajes;


messagesWebRouter.get('/static/Chat', twoRole('user','premium'),  async (req, res) => {
    mensajes = await getMessages();
    res.render('chat', {
        ... await decrypt(req.signedCookies['authorization']),
        messages : mensajes,
        js: 'messages.js'
    })
})