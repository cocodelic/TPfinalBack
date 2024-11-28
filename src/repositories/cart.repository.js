import pool from "../config/dbMysql.config.js";

class CartRepositoryMySQL {
    static async addProductToCart(user_id, product_id) {
        const query = 'INSERT INTO Cart( user_id, product_id) VALUES( ?, ? )'

        const result = await pool.execute(query, [user_id, product_id])

        return result
    }

    static async removeProductInCart() {

    }

    static async a() {

    }

    static async a() {

    }

    static async a() {

    }

}

export default CartRepositoryMySQL