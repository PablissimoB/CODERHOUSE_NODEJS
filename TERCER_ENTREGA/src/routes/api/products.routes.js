import { Router } from "express";
import { deleteById, getAll, getById, post, putById } from "../../controllers/product.controller.js";

const prodsRouter = Router();
prodsRouter.get('/', getAll)
prodsRouter.get('/:id', getById )
prodsRouter.post('/',post)
prodsRouter.put('/:id', putById)
prodsRouter.delete('/:id', deleteById)
export default prodsRouter;