require('dotenv').config();
const express = require("express");
const app = express();
const productsRoutes = require("./src/routes/products");
const categoriesRoutes = require("./src/routes/categories");
const usersRoutes = require("./src/routes/user");
const authRoutes = require("./src/routes/auth");
require("./src/models")

app.use(express.json());
const port = 4467;

app.use("/products", productsRoutes);
app.use("/categories", categoriesRoutes);
app.use(usersRoutes);
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
