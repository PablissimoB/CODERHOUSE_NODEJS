import { getUserDao } from "../dao/models/users.models.js";
import { mongoose } from "mongoose";

const usersDao = await getUserDao();

class UsersService {
    async getUser(field,value){
        if(field == '_id'){
            const user = await usersDao.readById(value);
            return user;
        }
    }
    async addUser(data){
        const user = await usersDao.create(data)
        return user
    }
}

export const usersServices = new UsersService();