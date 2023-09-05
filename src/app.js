import express from "express";
import ProductManager from "./ProductManager.js";


const manager = new ProductManager("../files/products.json");
const app = express();
const PORT = 8080;

app.get("/products", async (req, res) => {

  const {limit} = req.query;
  const products = await manager.getProducts();
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json({limitedProducts});

  } else {
    res.json({products});
  }
});

app.get("/products/:pid", async (req, res) => {

const {pid} =req.params

const products = await manager.getProducts();

const productFind = products.find((p) => p.id === parseInt(pid))
if (!productFind) return res.send({error: "No se encuentra el producto" });

console.log(productFind);

res.send({productFind});
});

app.listen(PORT, () => {
  console.log(`server escuchandoooo en ${PORT}`)
})