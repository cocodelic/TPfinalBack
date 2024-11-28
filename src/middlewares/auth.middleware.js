import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment.js'

const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const accessToken = req.headers.authorization.split(' ')[1]
        console.log(jwt.verify(accessToken, ENVIROMENT.SECRET_KEY))
        const userData = jwt.verify(accessToken, ENVIROMENT.SECRET_KEY)

        const { name, email, role, user_id } = userData
/*         if(!allowedRoles.includes(role)){
            return res.send({error: `El usuario ${name} cuyo mail es ${email} no tiene autorización debido a que su rol es ${role} y necesita jerarquía de admin`})
        } */

        req.userId = user_id

        return next()
    }

}

export default authMiddleware