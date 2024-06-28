const express = require("express");
const router = express.Router();
const productController = require("../../controller/productController");

// get all the cars
router.get("/", productController.getAllProducts);
//get car by ID
router.get("/:id", productController.getProductById);
//add a new car
router.post("/", productController.createProduct);
//create a new car
router.put("/:id", productController.udpateProduct);
//delete a car
router.delete("/:id", productController.deleteProduct);

module.exports = router;