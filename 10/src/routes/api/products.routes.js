import { Router } from "express";
import { deleteById, getAll, getById, post, putById } from "../../controllers/product.controller.js";
import { getMockProducts } from "../../test/product.service.test.js";

const prodsRouter = Router();
prodsRouter.get('/', getAll)
prodsRouter.get('/mockingproducts/', getMockProducts )
prodsRouter.get('/:id', getById )
prodsRouter.post('/',post)
prodsRouter.put('/:id', putById)
prodsRouter.delete('/:id', deleteById)
export default prodsRouter;