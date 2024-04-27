import { usersServices } from "../services/users.services.js";
import { toPOJO } from "../utils/utils.js";

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
        const usuario = await usersServices.addUser(req.body)
        req.user = usuario
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
    const { current_cart, email, role, first_name, last_name } = user;
    const responseObject = {current_cart, email, role, first_name, last_name };
    res.json(toPOJO(responseObject))
}

export async function getAllUsers(req, res,next){
    try {
        const users = await usersServices.getAllUser()
        const usersData = users.map(user => {return {  role: user.role, first_name: user.first_name, last_name: user.last_name, email: user.email}})
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