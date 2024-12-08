import ENVIROMENT from "../config/enviroment.js";
import ResponseBuilder from "../helpers/builders/ResponseBuilder.js";
import AppError from "../helpers/errors/app.error.js";
import{ ProductRepositoryMySQL }from "../repositories/product.repository.js";
import jwt from 'jsonwebtoken'


const getAllProductsController = async (req, res, next) => {
    try{
    const products = await ProductRepositoryMySQL.getAllProducts()

    if(!products){
        return next(new AppError("No se encontraron productos", 404))
    }
        
    const response = new ResponseBuilder()
    .setCode('PRODUCTS_RECEIVED_SUCCESS')
    .setMessage('Productos recibido con éxito.')
    .setOk(true)
    .setStatus(200)
    .setPayload(
        {
            products: products
        }
    )
    .build()
    res.json(response)
    }
    catch(err){
        return next(new AppError(err.message, err.code))
    }
}


const getProductByIdController = async (req, res, next) => {
    try{
        const { product_id } = req.params
        const product = await ProductRepositoryMySQL.getProductById(product_id)
        
        if(!product || !product.active){
            return next(new AppError("No se encontró el producto solicitado", 404))
        }

        const response = new ResponseBuilder()
        .setCode('PRODUCT_RECEIVED_SUCCESS')
        .setMessage('Producto recibido con éxito.')
        .setOk(true)
        .setStatus(200)
        .setPayload(
            {
                product: product
            }
        )
        .build()
        res.json(response)
        }
        catch(err){
            return next(new AppError(err.message, err.code))
        }
}
const createProductController = async (req, res, next) => {
    try{
        const newProduct = req.body

        newProduct.seller_id = req.userId

        const product = (await ProductRepositoryMySQL.createProduct(newProduct)).new_product_data
    
        const response = new ResponseBuilder()
        .setCode('PRODUCT_CREATED_SUCCESS')
        .setMessage('Producto creado con éxito.')
        .setOk(true)
        .setStatus(200)
        .setPayload(
            {
                product_created: product
            }
        )
        .build()
        res.json(response)
        }
        catch(err){
            return next(new AppError(err.message, err.code))
        }
}
const updateProductController = async (req, res, next) => {
    try{
        const { product_id } = req.params
        const updated_data = req.body

        const productToUpdate = await ProductRepositoryMySQL.getProductById(product_id)

        if(!productToUpdate){
            return next(new AppError("No se encontró el producto solicitado", 404))
        }

        await ProductRepositoryMySQL.updateProduct(product_id, updated_data)

        const response = new ResponseBuilder()
        .setCode('PRODUCT_UPDATE_SUCCESS')
        .setMessage('Producto actualizado con éxito.')
        .setOk(true)
        .setStatus(200)
        .setPayload({
            oldProduct: productToUpdate,
            newProduct: updated_data
        })
        .build()
    
        res.json(response)
    }
    catch(err){
        return next(new AppError(err.message, err.code))
    }
}
const deleteProductController = async (req, res, next) => {
    try{
        const { product_id } = req.params

        const productoRestante = await ProductRepositoryMySQL.deleteProduct(product_id)
        console.log(productoRestante)
        if(productoRestante.length === 0){
            return next(new AppError("No se encontró el producto solicitado", 404))
        }
        const response = new ResponseBuilder()
        .setCode('PRODUCT_DELETE_SUCCESS')
        .setMessage('Producto eliminado con éxito.')
        .setOk(true)
        .setStatus(200)
        .setPayload(productoRestante)
        .build()
        res.json(response)

    }
    catch(err){
        return next(new AppError(err.message, err.code))
    }
}

const getUserProducts = async (req, res, next) => {
    try{
        
        const userId = req.userId
        const products = await ProductRepositoryMySQL.getUserProducts(userId)
        
        if(products.length === 0){
            return next(new AppError("El usuario no posee productos", 404))
        }

        const response = new ResponseBuilder()
        .setCode('PRODUCTS_RECEIVED_SUCCESS')
        .setMessage('Productos recibidos con éxito.')
        .setOk(true)
        .setStatus(200)
        .setPayload(
            {
                products: products
            }
        )
        .build()
        res.json(response)
        }
        catch(err){
            return next(new AppError(err.message, err.code))
        }
}

export { deleteProductController, createProductController, getAllProductsController, getProductByIdController, updateProductController, getUserProducts}