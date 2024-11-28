import express from 'express'
import {loginController, registerController, validateEmailController, forgotPasswordController, resetPasswordController} from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/register', registerController)
authRouter.get('/validate-email/:validationToken', validateEmailController)
authRouter.post('/login', loginController)
authRouter.post('/forgot-password', forgotPasswordController)
authRouter.put('/reset-password/:validationToken', resetPasswordController)




export default authRouter