import { Router } from "express";
import { userModel } from "../models/users.models.js";

const sessionsRouter = Router()
sessionsRouter.get('/', async (req,res) => {
    try{
       
    }
    catch(error){
        res.status(400).send({mensaje:error});
    }
})

sessionsRouter.post('/', async (req,res) => {
    try{
        const usuario = await userModel.findOne(req.body)
  if (!usuario) {
    return res
      .status(401)
      .json({
        status: 'error',
        message: 'login failed'
      })
  }
  req.session['user'] = {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
  }

  if (usuario.userType === 'admin') {
    req.session['user'].rol = 'admin'
  } else {
    req.session['user'].rol = 'usuario'
  }

  res
    .status(201)
    .json({
      status: 'success',
      payload: req.session['user']
    })


    }
    catch(error){
        res.status(400).send({mensaje:error});
    }
})

sessionsRouter.delete('/current', async (req, res) => {
    req.session.destroy(err => {
      res.status(204).json({ status: 'success' })
    })
  })

export default sessionsRouter