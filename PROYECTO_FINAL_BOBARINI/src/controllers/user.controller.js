import { usersServices } from "../services/users.services.js";
import { cartsServices } from "../services/carts.services.js";
import { toPOJO } from "../utils/utils.js";
import { emailService } from "../services/email.service.js";

export async function get(req,res,next){
    const id = req.params.id;
        const user = await usersServices.getUser('_id', id)
        try {
            if (user) {
                const usersData = {role: user.role, first_name: user.first_name, last_name: user.last_name, email: user.email, cart: user.cart}
                res.status(200).send(toPOJO(usersData));
            }
            else {
                res.status(404).send("Usuario no existente");
            }
        }
        catch (error) {
            res.status(400).send({ mensaje: error });
        }
}

export async function postUser(req,res,next){
    try {
        const newCart = await cartsServices.newCart();
        const usuario = req.body;
        const user = await usersServices.addUser(usuario)
        const cartUpdated = [newCart._id];
        const userUpdated = await usersServices.updateUser(user._id, {current_cart: newCart._id, cart: cartUpdated });
        req.user = userUpdated
        res.status(201).json({
            status: 'success',
            payload: user.toObject(),
            token
        });
        next();
    }
    catch (error) {
        res.status(400).send({ mensaje: error });
    }
}

export async function autenticar(req,res,next){
    const { user } = req;
    const { current_cart, email, role, first_name, last_name, _id } = user;
    const responseObject = {current_cart, email, role, first_name, last_name, _id };
    res.json(toPOJO(responseObject))
}

export async function getAllUsers(req, res,next){
    try {
        const users = await usersServices.getAllUser()
        const usersData = users.map(user => {return {  role: user.role, first_name: user.first_name, last_name: user.last_name, email: user.email, _id: user._id}})
        res.status(200).send(toPOJO(usersData))
    } catch (error) {
        next(error)
    }
}

export async function getUserToJson(req, res,next){
    res.json(req.user)
}

export async function updateUser(req, res,next){
    const { id } = req.params;
    const { first_name, last_name, role, email, password, cart, currentCart } = req.body
    const user = await usersServices.getUser('_id', id);
    const cartUpdated = user.cart;
    if(cart){
        cartUpdated.push({ _id: cart });
    }
    
    let lastLogin = new Date();
    const users = await usersServices.updateUser(id, { first_name, last_name, role, email, password, cart: cartUpdated, last_login: lastLogin, current_cart: currentCart });
    try {
        if (users) {
            res.status(200).send(users);
        }
        else {
            res.status(404).send("Usuario no existente");
        }
    }
    catch (error) {
        res.status(400).send({ mensaje: error });
    }
}

export async function deleteUser(req, res,next){
    const { id } = req.params;
    const users = await usersServices.deleteUser(id);
    try {
        if (users) {
            res.status(200).send(users);
        }
        else {
            res.status(404).send("Usuario no existente");
        }
    }
    catch (error) {
        res.status(400).send({ mensaje: error });
    }
}

export async function deleteUsers(req, res,next){

    try {
        const users = await usersServices.getAllUser()
        const currentTime = new Date();
    for(const user of users){
        const lastLogin = new Date(user.last_login);
        if( currentTime -  lastLogin > 2880 * 60 * 1000){
            console.log("a eliminar usuario: " + user._id);
            const userDeleted = await usersServices.deleteUser(id);
            const mensaje = await emailService.send(user.email, "Su cuenta fue eliminada", "Hemos eliminado su cuenta porque no se logeo en los ultimos 2 dias");
            }
        }
        res.status(200).end();
    }
    catch (error) {
        res.status(400).send({ mensaje: error });
    }
}

export async function authenticateUserSession(req, res,next){
    const { email, password } = req.body;
    
    try {
        const user = await usersServices.autenthicateUser(email, password)
        req.user = user
        next()
      } catch (error) {
        next(error)
      }
}