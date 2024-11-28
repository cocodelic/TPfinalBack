import mysql from 'mysql2/promise'
import ENVIROMENT from './enviroment.js'



const pool = mysql.createPool(
    {
        host: ENVIROMENT.MYSQL.HOST,
        user: ENVIROMENT.MYSQL.USERNAME ,
        password: ENVIROMENT.MYSQL.PASSWORD,
        database: ENVIROMENT.MYSQL.DATABASE
    }
)

pool.getConnection().then((result) => {
    console.log('Conexión con MySql exitosa')
})
.catch((err) => {
    console.error('Error en la conexión: ', err)
})

export default pool