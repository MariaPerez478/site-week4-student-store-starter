const express = require("express");
const router = express.Router();
const orderController = require("../../controller/orderController");

// get all the cars
router.get("/", orderController.getAllOrders);
//get car by ID
router.get("/:order_id", orderController.getOrderById);
//add a new car
router.post("/", orderController.createOrder);
//create a new car
router.put("/:order_id", orderController.udpateOrder);
//delete a car
router.delete("/:order_id", orderController.deleteOrder);

//BELOW ARE NEW LINES OF CODE IT MIGHT NOT WORK 
router.post("/:order_id/items", orderController.addItemsToOrder); // New route to add items to an order
router.get("/:order_id/total", orderController.calculateOrderTotal); // New route to calculate order total


module.exports = router;

//everyhting happens in controller like new functions