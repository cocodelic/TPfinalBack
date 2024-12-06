/* import pool from "../config/dbMysql.config.js" */
import pool from "../config/dbMysql.config.js"

class ProductRepositoryMySQL {
    static async createProduct(new_product_data) {
        const {
            title,
            price,
            stock,
            description,
            seller_id,
            category,
            image_base64
        } = new_product_data
        const query = `INSERT INTO Products(title,price,stock,description,seller_id,category,image_base64)
        VALUES (?,?,?,?,?,?,?)`

        const response = await pool.execute(query, [title, price, stock, description, seller_id, category, image_base64])

        return { response: response, new_product_data: new_product_data }
    }

    static async updateProduct(product_id, newProductData) {

        const values = []
        let query = 'UPDATE Products SET '

        for (let key in newProductData) {
            if (newProductData[key]) {
                values.push(newProductData[key])
                query += `${key} = ?, `
            }
        }

        query = query.slice(0, query.length - 2) //Recorto ', ' del final para evitar error de sintaxis SQL

        query += ' WHERE Products.id = ?'

        values.push(product_id)

        const result = await pool.execute(query, values)

        return result
    }

    static async getAllProducts() {
        const result = await pool.execute(`SELECT * FROM Products WHERE active = true`)

        return result[0]
    }

    static async getProductById(product_id) {
        const [rows] = await pool.execute(`SELECT * FROM Products WHERE id = ?`, [product_id])

        return rows.length > 0 ? rows[0] : null
    }

    static async deleteProduct(product_id) {
        const result = await pool.execute('UPDATE Products SET active = false WHERE id = ? AND active = 1', [product_id])

        const productoEliminado = await pool.execute('SELECT * FROM Products WHERE id = ?', [product_id])

        return productoEliminado[0]
    }

    static async getUserProducts(userId) {
        const result = await pool.execute('SELECT * FROM Products WHERE seller_id = ? AND active = true', [userId])

        return result[0]
    }
}

export { ProductRepositoryMySQL }