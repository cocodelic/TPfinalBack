import express from "express";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import dotenv from "dotenv";
import cors from "cors";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import ENVIROMENT from "./config/enviroment.js";
import { ProductRepositoryMySQL} from "./repositories/product.repository.js";
import { UserRepositoryMySQL } from "./repositories/user.repository.js";
import pool from "./config/dbMysql.config.js";
import CartRepositoryMySQL from "./repositories/cart.repository.js";
import cartRouter from "./routes/cart.route.js";

const app = express();
const PORT = 7000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter)

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(
    `El servidor está funcionando en la dirección http://localhost:${PORT}`
  );
});