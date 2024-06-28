const orderModel = require("../models/orderModel");

// Function gets all the cars
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to get car by ID
const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.getOrderById(req.params.order_id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




//THIS WORKS 
//Function to create a new car
const createOrder = async (req, res) => {
  try {
    const newOrder = await orderModel.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};








//Function to update a car
const udpateOrder = async (req, res) => {
  try {
    //the line below is a maybe 
    const order_id = req.params.order_id;
    const updatedOrder = await orderModel.updateOrder(req.params.order_id, req.body);
    //NEW NEW LINE MIGHT NOT NEED
    //await orderModel.updateOrder(req.params.order_id);
    ////////////////////////////////
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: "order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Function to delete a car
const deleteOrder = async (req, res) => {
  try {
    //the line below is a maybe 
    //const order_id = req.params.order_id;
    const deletedOrder = await orderModel.deleteOrder(req.params.order_id);
    if (deletedOrder) {
      res.status(200).json(deletedOrder);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//THIS IS NEW CODE IT MIGHT NOT WORK

/*const addItemsToOrder = async (req, res) => {
    try {
      const order_id = req.params.order_id;
      const orderItemsData = req.body.items; // Assuming the request body contains an array of items to add
      const newOrderItems = await orderModel.addItemsToOrder(order_id, orderItemsData);
      res.status(201).json(newOrderItems);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };*/

//NEW NEW CODE



//THIS ONE WORKS 
const addItemsToOrder = async (req, res) => {
    try {
      const order_id = req.params.order_id;
      const orderItemsData = req.body.items; // Assuming the request body contains an array of items to add
  
      // Create new order items
      const newOrderItems = await orderModel.addItemsToOrder(order_id, orderItemsData);

      res.status(201).json(newOrderItems);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };









  
  
  const calculateOrderTotal = async (req, res) => {
    try {
      const order_id = req.params.order_id;
      const totalPrice = await orderModel.calculateOrderTotal(order_id);
      res.status(200).json({ total_price: totalPrice });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

//export the functions
module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  udpateOrder,
  deleteOrder,
  //BELOW IS NEW GOOD BE CAREFL
  addItemsToOrder,
  calculateOrderTotal,
};