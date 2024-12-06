import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.js'

const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const accessToken = req.headers.authorization.split(' ')[1]

        const userData = jwt.verify(accessToken, ENVIROMENT.SECRET_KEY)

        const { name, email, role, user_id } = userData

        req.userId = user_id

        return next()
    }

}

export default authMiddleware