const express = require("express");
const app = express();
const productsRoutes = require("./src/routes/products");
const port = 4467;
require(".src/models")

app.use(express.json());

app.use("/products", productsRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
