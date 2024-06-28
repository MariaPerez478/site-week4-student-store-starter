const express = require("express");
const PORT = 3000;
const cors = require("cors");
const morgan = require("morgan");

//import the carRoutes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderItemsRoutes = require("./routes/oder_itemRoutes");
// Middleware
const app = express();
app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(morgan("dev"));
app.use(express.json()); //Enable the use of JSON data

app.get("/", (req, res) => {
  res.send("Hello from the backend -- You are currently at the / route");
});

//add car routes here
app.use("/products", productRoutes);

app.use("/orders", orderRoutes);

app.use("/ordersitems", orderItemsRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
});







//only controller and model
//getAllProducts


/*const express = require('express')
const dataProducts = require('../data/products.json')
let products = dataProducts.products
const app = express()
const PORT = 3000


app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log('Server running on port 3000'))



app.get('/products', (req, res) => {
    res.json(products)

  })

  

  app.get('/products/:productId', (req, res) => {
    const productId = parseInt(req.params.productId)
    const product = products.find(product => product.id === productId)
    
    if (product) {
      res.json(product)
    } else {
      res.status(404).send('product not found')
    }
  })

  app.post('/products', (req, res) => {
    const {id, name, category, image_url, description, price } = req.body
  
    const newProduct = {
      id: products.length + 1,
      name,
      category,
      image_url,
      description,
      price

    }
  
    pets.push(newProduct)
    res.status(201).json(newProduct)
  })

  app.put('/products/:productId', (req, res) => {
    const { productId } = req.params
  const productIndex = producst.findIndex(product => product.id === parseInt(productId))

  if (productIndex !== -1) {
    const updatedProductInfo = req.body
    products[productIndex] = { ...products[productIndex], ...updatedProductInfo }
    res.json(products[productIndex])
  } else {
    res.status(404).send('product not found')
  }

  })

  app.delete('/products/:productId', (req, res) => {
    const { productId } = req.params
    const initialLength = products.length
    products = products.filter(product => product.id !== parseInt(productId))
  
    if (products.length < initialLength) {
      res.status(204).send()
    } else {
      res.status(404).send('product not found')
    }
  })
  */