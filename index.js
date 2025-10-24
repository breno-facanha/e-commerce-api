const express = require("express");
const app = express();
const productsRoutes = require("./src/routes/products");
const categoriesRoutes = require("./src/routes/categories");
require("./src/models")

app.use(express.json());
const port = 4467;

app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
