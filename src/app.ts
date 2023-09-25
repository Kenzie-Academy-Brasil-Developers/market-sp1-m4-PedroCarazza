import express from "express";
import { createProducts, deleteProducts, getAllProducts, getProductsById, updateProducts } from "./logic";
import { isProductIdValid, isProductNameUnique } from "./middlewares";

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("API started")
})

app.post("/products", isProductNameUnique, createProducts);
app.get("/products", getAllProducts);
app.get("/products/:id", isProductIdValid, getProductsById);
app.patch("/products/:id", isProductIdValid, isProductNameUnique, updateProducts);
app.delete("/products/:id", isProductIdValid, deleteProducts);