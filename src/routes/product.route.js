import express from 'express'
import { getAllProductsController,createProductController,deleteProductController,getProductByIdController,updateProductController, getUserProducts } from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const productRouter = express.Router()


productRouter.get('/detail/:product_id', getProductByIdController)
productRouter.get('/', getAllProductsController)
productRouter.get('/user', authMiddleware(['admin']), getUserProducts)
productRouter.post('/',authMiddleware(['admin']), createProductController)
productRouter.put('/:product_id',authMiddleware(['admin']), updateProductController)
productRouter.delete('/:product_id',authMiddleware(['admin']), deleteProductController)

export default productRouter