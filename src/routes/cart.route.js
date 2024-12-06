import express from 'express'
import { addProductToCartController, getAllCartProductsController, removeProductFromCartController } from '../controllers/cart.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const cartRouter = express.Router()


cartRouter.get('/',authMiddleware(['admin']), getAllCartProductsController)
cartRouter.post('/:productId',authMiddleware(['admin']), addProductToCartController)
cartRouter.delete('/', authMiddleware(['admin']), removeProductFromCartController)








export default cartRouter