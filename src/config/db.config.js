import mongoose from 'mongoose'
import ENVIROMENT from './enviroment.js'

/* mongoose.connect('mongodb://localhost:27017/PRIMER_PROYECTO_SOLO') */
mongoose.connect(ENVIROMENT.MONGO_DB_CONNECTION_STR +'/' + ENVIROMENT.MONOGO_DB_DATABASE)
.then(() => {
    console.log('Conexión exitosa')
})
.catch(() => {
    console.log('Error de conexión')
})

export default mongoose