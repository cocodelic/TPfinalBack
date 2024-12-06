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

pool.getConnection()
    .then(async (connection) => {
        
        await connection.query(`USE ${ENVIROMENT.MYSQL.DATABASE}`)
        console.log('Conexión con MySQL exitosa y base de datos seleccionada')
        connection.release()
    })
    .catch((err) => {
        console.error('Error en la conexión: ', err)
    })

export default pool