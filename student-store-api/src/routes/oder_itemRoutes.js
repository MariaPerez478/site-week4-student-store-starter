const express = require("express");
const router = express.Router();
const orderItemController = require("../../controller/order_itemController");

// get all the cars
router.get("/", orderItemController.getAllOrdersItems);
//get car by ID
router.get("/:order_item_id", orderItemController.getOrderItemById);
//add a new car
router.post("/", orderItemController.createOrderItem);
//create a new car
router.put("/:order_item_id", orderItemController.updateOrderItem);
//delete a car
router.delete("/:order_item_id", orderItemController.deleteOrderItem);

module.exports = router;

// /orders/order_items