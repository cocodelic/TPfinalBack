import ResponseBuilder from '../helpers/builders/ResponseBuilder.js'
import AppError from '../helpers/errors/app.error.js'
import CartRepositoryMySQL from '../repositories/cart.repository.js'

export const getAllCartProductsController = async (req, res, next) => {
    try{

        const userCart = await CartRepositoryMySQL.getUserCartProducts(req.userId)

        if(!userCart){
            return new AppError('Carrito no encontrado', 404)
        }

        const response = new ResponseBuilder()
        .setCode('CART_RECEIVED_SUCCESS')
        .setMessage('Carrito recibido con éxito.')
        .setOk(true)
        .setStatus(200)
        .setPayload(
            {
                products: userCart
            }
        )
        .build()

        res.json(response)

    }catch(err){
        return next(new AppError(err.message, err.code))
    }
}

export const addProductToCartController = async (req, res, next) => {
    try{
        const { productId } = req.params



        await CartRepositoryMySQL.addProductToCart(req.userId, productId)


        const response = new ResponseBuilder()
        .setCode('PRODUCT_ADD_SUCCESS')
        .setMessage('Producto agregado al carrito con éxito.')
        .setOk(true)
        .setStatus(200)
        .build()

        res.json(response)
    }
    catch(err){
        return next( new AppError(err.message))
    }
}

export const removeProductFromCartController = async (req, res, next) => {

    try{

    const { product_id } = req.body

    await CartRepositoryMySQL.removeProductFromCart(req.userId, product_id)

    const response = new ResponseBuilder()
    .setCode('PRODUCT_REMOVED_SUCCESS')
    .setMessage('Producto removido del carrito con éxito.')
    .setOk(true)
    .setStatus(200)
    .build()

    }catch(err){
        return next(new AppError(err.message))
    }


}


