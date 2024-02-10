import { getUserDao } from "../dao/user/users.dao.mongoose.js";

const usersDao = await getUserDao();

class UsersService {
    async getUser(field,value){
        if(field == '_id'){
            const user = await usersDao.readById(value);
            return user;
        }
    }
    async addUser(data){
        const user = await usersDao.new(data)
        return user
    }
    async getAllUser (){
        const users = await usersDao.readMany();
        return users
    }
    async deleteUser(id){
        const users = await usersDao.findDeleteOne(id);
        return users
    }
    async updateUser(id,data){
        const users = await usersDao.findUpdateOne(id, data);
        return users
    }
}

export const usersServices = new UsersService();