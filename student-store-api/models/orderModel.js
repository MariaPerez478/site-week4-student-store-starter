const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Function gets all the cars
//const getAllOrders = async () => {
  //return prisma.order.findMany()
    /*where: filter,
    orderBy: orderBy,
  });*/
//};


//THIS CODE WORKS IS JUST A TRYING 
/*const getAllOrders = async () => {
    return prisma.order.findMany(); 
    
  };
  
   //THIS CODE WORKS IS JUST A TRYING
  const getOrderById = async (order_id) => {
    return prisma.order.findUnique({
      where: { order_id: parseInt(order_id) },
      /*include: {
        OrderItem: true // Assuming `OrderItem` is the name of the relation in your Prisma schema
      }*/
    /*});
  };*/

  const getAllOrders = async () => {
    return prisma.order.findMany({
      include: {
        OrderItem: true
      }
    });
  };
  
  ///MAYBE TO CHANGE
  const getOrderById = async (order_id) => {
    const price = await calculateOrderTotal(order_id);
    console.log(price);
    const t = await prisma.order.update({
      where: { order_id: parseInt(order_id) },
      data: {
        total_price: price,
      }
    });
  
    return prisma.order.findUnique({ 
      where: { order_id: parseInt(order_id) },
      include: {
        OrderItem: true
      }
    });
  };





  //GOOD CODE
  // Function to get order by ID with associated order items
  /*const getOrderById = async (order_id) => {
    return prisma.order.findUnique({
      where: { order_id: parseInt(order_id) },
      include: {
        OrderItem: true
      }
    });
  };*/



//Function to get car by ID
//const getOrderById = async (order_id) => {
 // return prisma.order.findUnique({ where: { order_id: parseInt(order_id) } });
//};

//Function to create a new car
const createOrder = async (orderData) => {
    console.log(orderData);
  return prisma.order.create({ data: orderData });
};

//Function to update a car
const updateOrder = async (order_id, orderData) => {
  return prisma.order.update({
    where: { order_id: parseInt(order_id) },
    data: orderData,
  });
};

//Function to delete a car
const deleteOrder = async (order_id) => {
  return prisma.order.delete({ where: { order_id: parseInt(order_id) } });
};



//THIS IS NEW CODE ADDED IT MIGHT NOT WORK 




//THIS WORKS WHEN
/*const addItemsToOrder = async (order_id, orderItemsData) => {
  try {
    const createOrderItems = orderItemsData.map(item => {
      return prisma.orderItem.create({
        data: {
          order_id: parseInt(order_id),
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price

        }
      });
    });

    return await Promise.all(createOrderItems);
  } catch (error) {
    console.error("Error adding items to order:", error);
    throw new Error("Failed to add items to order. Please check your input data.");
  }
};*/

const addItemsToOrder = async (order_id, orderItemsData) => {
    console.log(orderItemsData)
    const createdOrderItems = [];
    for (const item of orderItemsData) {
        const createdItem = await prisma.orderItem.create({
            data: {
                order_id: parseInt(order_id),
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
            }
        });
        createdOrderItems.push(createdItem);
    }
    //recalculating and updating total_price
    //await updateOrderTotalPrice(order_id);
    return createdOrderItems;
};






  
  const calculateOrderTotal = async (order_id) => {
    const order = await prisma.order.findUnique({
      where: { order_id: parseInt(order_id) },
      include: {
        OrderItem: true
      }
    });
  
    if (!order) {
      throw new Error("Order not found");
    }
  
    const totalPrice = order.OrderItem.reduce((total, item) => {
      return total + (item.quantity * item.price);
    }, 0);
    console.log(totalPrice)
  
    return totalPrice;
  };


  //NEW NEW UPDATE CODE 

  







//export the functions
module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  //NEW LINES OF CODE BELOW 
  addItemsToOrder,
  calculateOrderTotal,
  //NEW NEW LINES OF CODE
  
};
