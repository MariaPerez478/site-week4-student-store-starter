const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function gets all the cars
const getAllOrdersItems = async () => {
  return prisma.orderItem.findMany()
    /*where: filter,
    orderBy: orderBy,
  });*/
};

//Function to get car by ID
const getOrderItemById = async (order_item_id) => {
  return prisma.orderItem.findUnique({ where: { order_item_id: parseInt(order_item_id) } });
};


//THIS IS A MAYBE 
const createOrderItem = async (orderItemData) => {
    try {
      const newOrderItem = await prisma.orderItem.create({
        data: {
          
          order_id: orderItemData.order_id,
          product_id: orderItemData.product_id,
          quantity: orderItemData.quantity,
          price: orderItemData.price,
        },
      });
      return newOrderItem;
    } catch (error) {
      throw new Error(`Error creating order item: ${error.message}`);
    }
  };






//THIS CODE WORKS IM JUST TESTING
//Function to create a new car
/*const createOrderItem = async (orderItemData) => {
  return prisma.orderItem.create({ data: orderItemData });
};*/







//THIS CODE WORKS FINE IM JUST TRYING SOMETHING
//Function to update a car
/*const updateOrderItem = async (order_item_id, orderItemData) => {
  return prisma.orderItem.update({
    where: { order_item_id: parseInt(order_item_id) },
    data: orderItemData,
  });
};*/

const updateOrderItem = async (order_item_id, orderItemData) => {
    try {
      // Update the order item
      const updatedOrderItem = await prisma.orderItem.update({
        where: { order_item_id: parseInt(order_item_id) },
        data: orderItemData,
      });
  
      // Calculate the total price for the order
      const order = await prisma.order.findUnique({
        where: { order_id: updatedOrderItem.order_id },
        include: { OrderItem: true },
      });
  
      if (!order) {
        throw new Error("Order not found");
      }
  
      const totalPrice = order.OrderItem.reduce((total, item) => {
        return total + item.quantity * item.price;
      }, 0);
  
      // Update the order with the new total price
      await prisma.order.update({
        where: { order_id: updatedOrderItem.order_id },
        data: { total_price: totalPrice },
      });
  
      return updatedOrderItem;
    } catch (error) {
      throw new Error(`Error updating order item: ${error.message}`);
    }
  };

//Function to delete a car
const deleteOrderItem = async (order_item_id) => {
  return prisma.orderItem.delete({ where: { order_item_id: parseInt(order_item_id) } });
};

//export the functions
module.exports = {
  getAllOrdersItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};