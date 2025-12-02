const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./products.json");
const connectDB = require('./Models/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter')
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/auth", AuthRouter);

const port = process.env.PORT || 8000;

app.get("/api/products", (req, res) => {
  res.json(products);
});


// GET a single product by id
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.get('/api', (req, res) => res.send("API working"));

connectDB();

app.listen(port, () => {
  console.log(`Listening at the port ${port}`);
});
