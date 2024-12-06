import pool from "../config/dbMysql.config.js";

class CartRepositoryMySQL {
    static async addProductToCart(user_id, product_id) {
        const query = `INSERT INTO Cart (product_id, user_id, quantity)
VALUES (?,?, 1)
ON DUPLICATE KEY UPDATE
quantity = quantity + 1;
`

        const result = await pool.execute(query, [product_id, user_id])

        return result
    }

    static async removeProductFromCart(user_id, product_id) {
        const query =  `DELETE FROM Cart WHERE user_id = ? AND product_id = ?`

        const result = await pool.execute(query, [user_id, product_id])

        return result
    }

    static async getUserCartProducts(user_id) {
        const query = `SELECT * FROM Products
INNER JOIN Cart ON Products.id = Cart.product_id WHERE Cart.user_id = ? AND Products.active = 1`

        const result = await pool.execute(query, [user_id])

        return result[0]
    }

    static async a() {

    }

    static async a() {

    }

}

export default CartRepositoryMySQL