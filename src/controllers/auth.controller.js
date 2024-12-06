import bcrypt from 'bcrypt'
import { validateEmail, validateMinLength, validateString } from "../helpers/validations.js"
import ResponseBuilder from "../helpers/builders/ResponseBuilder.js"
import User from "../model/User.model.js"
import emailTransporter from "../helpers/emailTransporter.helper.js"
import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.js'
import { UserRepository, UserRepositoryMySQL } from '../repositories/user.repository.js'
import AppError from '../helpers/errors/app.error.js'

export const registerController = async (req, res, next) => {
    try {
        const { email, name, password } = req.body
        const datosRecibidos = {
            email: {
                value: email,
                validations: [
                    validateEmail
                ]
            },
            password: {
                value: password,
                validations: [
                    validateMinLength,
                    validateString
                ]
            },
            name: {
                value: name,
                validations: [
                    validateMinLength,
                    validateString
                ]
            }
        }

        const validationErrors = {
            name: [],
            password: [],
            email: []
        }
        let hayErrores = false
        for (let field_name in datosRecibidos) {
            for (let validation of datosRecibidos[field_name].validations) {
                let validationResult = validation(field_name, datosRecibidos[field_name].value)
                if (validationResult) {
                    validationErrors[field_name].push(validationResult)
                    hayErrores = true
                }
            }
        }

        if (hayErrores) {
            return next(new AppError('Los datos ingresados no cumplen los parámetros solicidatos', 400, validationErrors))
        }

        await UserRepositoryMySQL.createUser({
            name: name,
            email: email,
            password: password
        })

        const validationToken = jwt.sign(
            {
                email: email
            },
            ENVIROMENT.SECRET_KEY,
            {
                expiresIn: '1d'
            }
        )
        await emailTransporter.sendMail({
            to: email,
            subject: 'Verifica tu email',
            html: `<p>Para validar su email haga click <a href="http://localhost:5173/validate-email/${validationToken}">aquí</a></p>`
        })

        const successResponse = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setCode('REGISTER_SUCCESS')
            .setMessage('El registro se completo con éxito.')
            .setPayload({
                datosUsuario: {
                    name: name,
                    email: email
                }
            })
            .build()

        return res.json(successResponse)
    }
    catch (error) { 
        if (error.code === 11000) {
            return next(new AppError("El email ingresado ya se encuentra registrado", 400))
        }

        return next(new AppError(error.message, error.code))
    }
}

export const validateEmailController = async (req, res, next) => {
    try {
        const { validationToken } = req.params

        const { email } = jwt.verify(validationToken, ENVIROMENT.SECRET_KEY)

        const usuarioEncontrado = await UserRepositoryMySQL.getUserByEmail(email)

        if (usuarioEncontrado.is_verified) {
            return next(new AppError("El email ingresado ya se encuentra validado.", 400))
        }

        UserRepositoryMySQL.verifyUser(email)

        const respuesta = new ResponseBuilder()
            .setCode('VALIDATION_SUCCESS')
            .setOk(true)
            .setMessage('El usuario fue validado con éxito.')
            .setPayload({
                emailValidado: email
            })
            .setStatus(200)
            .build()

        return res.json(respuesta)
    }
    catch (error) {
        return next(new AppError(error.message, 500))
    }
}


export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const usuarioEncontrado = await UserRepositoryMySQL.getUserByEmail(email)

        if (!usuarioEncontrado) {
            return next(new AppError('El email ingresado no pertenece a ningún usuario.', 400))
        }
        if (!(await bcrypt.compare(password, usuarioEncontrado.password))) {
            return next(new AppError('El password ingresado es incorrecto', 400))
        }

        const accessToken = jwt.sign(
            {
                user_id: usuarioEncontrado.id,
                name: usuarioEncontrado.name,
                email: usuarioEncontrado.email, 
                role: usuarioEncontrado.role
            },
            ENVIROMENT.SECRET_KEY,
            {
                expiresIn: '1d' //Esto determina cuanto dura la sesion
            }
        )
        const responseSuccess = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setCode('LOGIN_SUCCESS')
            .setMessage('Inicio de sesión exitoso')
            .setPayload({
                accessToken: accessToken,
                seller_id: usuarioEncontrado.id,
                bienvenida: `Bienvenido de nuevo, ${usuarioEncontrado.name}!`
            })
            .build()


        return res.send(responseSuccess)
    }
    catch (error) {
        return next(new AppError(error.message, error.code))
    }
}

export const forgotPasswordController = async (req, res, next) => {

    try {
        const { email } = req.body

        const usuarioEncontrado = await UserRepositoryMySQL.getUserByEmail(email)

        if (!usuarioEncontrado) {
            return next(new AppError('El email ingresado no existe en la base de datos', 400))
        }

        const tokenResetPassword = jwt.sign({ email: email }, ENVIROMENT.SECRET_KEY, {
            expiresIn: '1d'
        })

        const resetUrl = 'http://localhost:5173/reset-password/' + tokenResetPassword

        emailTransporter.sendMail({
            to: email,
            subject: 'Olvidé mi contraseña',
            html: `Para cambiar su contraseña y recuperar su usuario, haga click <a href="${resetUrl}">aquí</a>`
        })

        res.json("ok")
    }
    catch (error) {
        return next(new AppError(error.message, error.code))
    }
}


export const resetPasswordController = async (req, res, next) => {
    try {
        const { password } = req.body

        const { validationToken } = req.params


        if (password.length < 8) {
            return next(new AppError('La longitud de la contraseña debe ser mayor a 8 caracteres', 400))
        }

        const email = jwt.verify(validationToken, ENVIROMENT.SECRET_KEY).email

        await UserRepositoryMySQL.resetPassword(email, password)

        const response = new ResponseBuilder()
            .setCode('PASSWORD_RESET_SUCCESS')
            .setMessage('El password fue renovado con éxito.')
            .setOk(true)
            .setStatus(200)
            .build()

        return res.json(response)

    }
    catch (error) {
        return next(new AppError(error.message, error.code))
    }
}




