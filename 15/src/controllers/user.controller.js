import { usersServices } from "../services/users.services.js";
import { toPOJO } from "../utils/utils.js";
import { errorService } from "../error/error.services.js";
import { ErrorType } from "../error/enum.js";
import { addLoggerHistorial, logger } from "../utils/logger.js";

export async function get(req,res,next){
    const id = req.params.id;
        const user = await usersServices.getUser('_id', id)
        try {
            if (user) {
                res.status(200).send(user);
            }
            else {
                const errorNew = errorService.newError(ErrorType.NOT_FOUND, 'Usuario no existente')
                next(errorNew);
            }
        }
        catch (error) {
            logger.error(error.message)
            addLoggerHistorial(error.message) 
            const errorNew = errorService.newError(ErrorType.SERVER_ERROR, 'Error en el servidor')
            next(errorNew);
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
        logger.error(error.message)
        addLoggerHistorial(error.message) 
        next(error)
    }
}

export async function autenticar(req,res,next){
    const { user } = req;
    const { cart, email, role, first_name, last_name } = user;
    const responseObject = { cart, email, role, first_name, last_name };
    res.json(toPOJO(responseObject))
}

export async function getAllUsers(req, res,next){
    try {
        const users = await usersServices.getAllUser()
        res.status(200).send(toPOJO(users))
    } catch (error) {
        logger.error(error.message)
        addLoggerHistorial(error.message) 
        const errorNew = errorService.newError(ErrorType.SERVER_ERROR, error.message)
        next(errorNew);
    }
}

export async function getUserToJson(req, res,next){
    res.json(req.user)
}

export async function updateUser(req, res,next){
    const { id } = req.params;
    const { first_name, last_name, role, email, password } = req.body
    const users = await usersServices.updateUser(id, { first_name, last_name, role, email, password });
    try {
        if (users) {
            res.status(200).send(users);
        }
        else {
            const errorNew = errorService.newError(ErrorType.NOT_FOUND, 'Usuario inexistente')
            next(errorNew);
        }
    }
    catch (error) {
        logger.error(error.message)
        addLoggerHistorial(error.message) 
        const errorNew = errorService.newError(ErrorType.SERVER_ERROR, error.message)
        next(errorNew);
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
        logger.error(error.message)
        addLoggerHistorial(error.message) 
        next(error)
    }
}
export async function authenticateUserSession(req, res,next){
    const { email, password } = req.body;
    
    try {
        const user = await usersServices.autenthicateUser(email, password)
        req.user = user
        next()
      } catch (error) {
        logger.error(error.message)
        addLoggerHistorial(error.message) 
        next(error)
      }
}