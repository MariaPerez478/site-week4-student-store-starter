const orderItemModel = require("../models/order_itemModel");

// Function gets all the cars
const getAllOrdersItems = async (req, res) => {
  try {
    const ordersItems = await orderItemModel.getAllOrdersItems();
    res.status(200).json(ordersItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to get car by ID
const getOrderItemById = async (req, res) => {
  try {
    const orderItem = await orderItemModel.getOrderItemById(req.params.order_item_id);
    if (orderItem) {
      res.status(200).json(orderItem);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to create a new car
const createOrderItem = async (req, res) => {
  try {
    const newOrderItem = await orderItemModel.createOrderItem(req.body);
    res.status(201).json(newOrderItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to update a car
//THIS WORKS DO NOT DELETE 
/*const udpateOrderItem = async (req, res) => {
  try {
    const updatedOrderItem = await orderItemModel.updateOrderItem(req.params.id, req.body);
    if (updatedOrderItem) {
      res.status(200).json(updatedOrderItem);
    } else {
      res.status(404).json({ error: "order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};*/

const updateOrderItem = async (req, res) => {
  try {
    const updatedOrderItem = await orderItemModel.updateOrderItem(req.params.order_item_id, req.body);
    if (updatedOrderItem) {
      res.status(200).json(updatedOrderItem);
    } else {
      res.status(404).json({ error: "order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to delete a car
const deleteOrderItem = async (req, res) => {
  try {
    const deletedOrderItem = await orderItemModel.deleteOrderItem(req.params.id);
    if (deletedOrderItem) {
      res.status(200).json(deletedOrderItem);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//export the functions
module.exports = {
  getAllOrdersItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  //udpateOrderItem,
  deleteOrderItem,
};