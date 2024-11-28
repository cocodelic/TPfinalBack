import User from "../model/User.model.js";
import bcrypt from 'bcrypt'
import pool from "../config/dbMysql.config.js";

class UserRepository {

    static async createUser(userData){
        userData.password = await bcrypt.hash(userData.password, 10)

        const newUser = new User(userData)
        return newUser.save()
    }

    static async resetPassword(email, newPassword){
        const usuarioEncontrado = await User.findOne({
            email: email
        })

        const passwordHash = await bcrypt.hash(newPassword,10)

        usuarioEncontrado.password = passwordHash

        return await usuarioEncontrado.save()
    }

    static async deleteUser(email){
        return User.findOneAndDelete({
            email: email
        })
    }
    
    static async getUserByEmail(email){
        const userGotten = await User.findOne({
            email: email
        })

        return userGotten
    }
    
}

class UserRepositoryMySQL {
    static async createUser(userData){
        const { name, email, password } = userData

        const hashedPassword = await bcrypt.hash(userData.password, 10)

        const query = 'INSERT INTO Users( name, email, password) VALUES( ?, ?, ? )'

        const result = await pool.execute(query, [name, email, hashedPassword])

        return result
    }

    static async resetPassword(email, password){
        const query = 'UPDATE Users SET password = ? WHERE Users.email = ?'

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.execute(query, [hashedPassword, email])

        return result
    }

    static async deleteUser(userId){
        const query = 'DELETE FROM Users WHERE Users.id = ?'
        
        const result = await pool.execute(query, [userId])

        return result
    }

    static async getUserByEmail(email){
        const query = 'SELECT * FROM Users WHERE Users.email = ?'

        const result = await pool.execute(query, [email])

        return result[0][0]
    }

    static async verifyUser(email){
        const query = 'UPDATE Users SET Users.is_verified = true WHERE Users.email = ?'

        const result = await pool.execute(query, [email])

        return result
    }
}

export { UserRepository, UserRepositoryMySQL }