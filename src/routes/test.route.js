import express from 'express'
import testController from '../controllers/test-controller.js'

const authRouter = express.Router()

authRouter.post('/test', testController)
authRouter.get("/test", testController)