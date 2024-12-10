
import bcrypt from 'bcrypt'
import pool from "../config/dbMysql.config.js";

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

export {  UserRepositoryMySQL }