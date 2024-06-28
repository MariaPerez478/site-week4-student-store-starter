import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";

function App() {
const [sidebarOpen, setSidebarOpen] = useState(false);
const [activeCategory, setActiveCategory] = useState("All Categories");
const [searchInputValue, setSearchInputValue] = useState("");
const [userInfo, setUserInfo] = useState({ name: "", dorm_number: ""});
const [products, setProducts] = useState([]);
const [cart, setCart] = useState({});
const [isFetching, setIsFetching] = useState(false);
const [isCheckingOut, setIsCheckingOut] = useState(false);
const [error, setError] = useState(null);
const [order, setOrder] = useState(null);
// Toggles sidebar
const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);
// Functions to change state (used for lifting state)
const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
const handleGetTotalCartItems = () => getTotalItemsInCart(cart);
const handleOnSearchInputChange = (event) => {
  setSearchInputValue(event.target.value);
};


const handleOnCheckout = async () => {
  setIsCheckingOut(true);
  try {
    // Calculate total price based on items in cart
    let calculatedTotalPrice = 0;
    for (const [productId, quantity] of Object.entries(cart)) {
      const product = products.find(p => p.product_id === parseInt(productId));
      if (product) {
        calculatedTotalPrice += product.price * quantity;
      }
    }

    // Prepare order data
    const orderData = {
      customer_id: parseInt(userInfo.name), // Assuming userInfo.name is the customer ID
      total_price: calculatedTotalPrice,
      status: "checking",
      created_at: new Date().toISOString(),
    };

    //trying 
    console.log("Created oRDER:", orderData);

    // Step 1: Create the order
    const orderResponse = await axios.post("http://localhost:3000/orders", orderData);
    const order = orderResponse.data;

    console.log("Created Order:", order);

    // Step 2: Create order items sequentially
    const createOrderItems = Object.entries(cart).map(async ([productId, quantity]) => {
      const product = products.find(p => p.product_id === parseInt(productId));
      if (product) {
        const newItem = {
          order_id: order.order_id,
          product_id: parseInt(productId),
          quantity: quantity,
          price: product.price,
        };

        console.log("Creating Item:", newItem);
        
        const itemResponse = await axios.post(`http://localhost:3000/orders/${order.order_id}/items`, newItem);
        createOrderItems.push(itemResponse.data);
        
        console.log("Item Response:", itemResponse.data);


        //await axios.post(`http://localhost:3000/orders/${order.order_id}/items`, newItem);
      }
    });

    // Wait for all item creation requests to complete
    await Promise.all(createOrderItems);

    // Step 3: Update order status to completed (if needed)
    await axios.put(`http://localhost:3000/orders/${order.order_id}`, {
      status: "completed",
    });

    // Clear the cart and reset checkout state
    setCart({});
    setIsCheckingOut(false);
    setOrder(order);
  } catch (error) {
    console.error("Error during checkout:", error);
    setError("An error occurred during checkout. Please try again.");
    setIsCheckingOut(false);
  }
};





const fetchProducts = async (params = {}) => {
  try {
    const response = await axios.get("http://localhost:3000/products", {params});
    console.log("Fetched products", response.data);
    setProducts(Array.isArray(response.data) ? response.data : []);
  }
  catch (error){
    console.log("Error fetching products: ", error);
    setProducts([]);
  }
}
useEffect(() => {
  fetchProducts();
}, []);


































/*function App() {
  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: "" });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again.");
        setIsFetching(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures useEffect runs only on mount

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  // Handler for search input change
  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  // Function to handle checkout
  /*const handleOnCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Prepare orderItems from cart
      const orderItems = Object.keys(cart).map((productId) => ({
        product_id: parseInt(productId),
        quantity: cart[productId],
        price: products.find((p) => p.id === parseInt(productId)).price,
      }));
  
      // Prepare payload
      const payload = {
        userInfo: userInfo,
        orderItems: orderItems,
      };
  
      // Send order data to backend
      const res = await axios.post("http://localhost:3000/orders", payload);
  
      // Update state with the created order and reset cart
      setOrder(res.data);
      setCart({});
      setIsCheckingOut(false);
    } catch (error) {
      console.error("Error placing order:", error);
      setError(`Error placing order: ${error.message}. Please try again.`);
      setIsCheckingOut(false);
    }
  };*/


//GOOD CODE
/*const handleOnCheckout = async (params = {}) => {
  setIsCheckingOut(true);
  console.log(userInfo.name);
  try {
    let orderData = {
      customer_id: parseInt(userInfo.name),
      total_price: 1.2,
      status: "checking",
      created_at: new Date().toISOString(),
    }
    const response = await axios.post("http://localhost:3000/orders", orderData);
    console.log("Order", response.data);
    const items = await createOrderItems(response.data.order_id);
    const price = await updatePrice({}, response.data.order_id);
    setCart({})
  }
  catch (error){
    console.log("Error fetching products: ", error);
  }
}

const createOrderItems = (order_id) => {
  console.log(cart);
  Object.entries(cart).forEach(async (key,val) => {
    try {
      let item = {
        product_id: parseInt(key[0]),
        quantity: key[1],
        price: parseFloat(products[key[0]-1].price)
      }

      const response = await axios.post(`http://localhost:3000/orders/${order_id}/items`, item);
      console.log(response.data);
    }
    catch (error){
      console.log("Error creating order items: ", error);
    }
  })
}

const updatePrice = async (params = {}, id) => {
  try {
    const response = await axios.get(`http://localhost:3000/orders/${id}`, {params});
    console.log(response.data);
  }
  catch (error){
    console.log("Error updating price: ", error);
  }
}

  /*const handleOnCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Prepare order payload
      const orderItems = Object.keys(cart).map((productId) => ({
        product_id: parseInt(productId),
        quantity: cart[productId],
        price: products.find((p) => p.id === parseInt(productId)).price,
      }));
  
      let totalPrice = orderItems.reduce((total, item) => total + (item.quantity * item.price),0);

      let orderData = {
        customer_id: 1,
        status: "pending", // Assuming userInfo contains customer details
        total_price: totalPrice, // Calculate total price based on order items
        created_at: new Date().toISOString(), // Use current time as created_at
        OrderItem: orderItems,
      };
  
      // Send order data to backend
      const response = await axios.post("http://localhost:3000/orders", orderData);
      console.log("Order", response.data);
      
      // Create order items for the placed order
      await createOrderItems(response.data.order_id);
  
      // Reset cart after successful checkout
      setCart({});
      setIsCheckingOut(false);
      setOrder(response.data); // Optionally update the order state if needed
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Error placing order. Please try again.");
      setIsCheckingOut(false);
    }
  };

  const createOrderItems = async (order_id) => {
    console.log(cart);
    try {
      // Create an array of promises for each order item creation
      const promises = Object.entries(cart).map(async ([productId, quantity]) => {
        const item = {
          product_id: parseInt(productId),
          quantity: quantity,
          price: parseFloat(products.find((p) => p.id === parseInt(productId)).price)
        };
  
        console.log("Creating order item:", item);
        const response = await axios.post(`http://localhost:3000/orders/${order_id}/items`, item);
        console.log("Order item created:", response.data);
        return response.data;
      });
  
      // Wait for all order item creation requests to complete
      await Promise.all(promises);
      console.log("All order items created successfully.");
    } catch (error) {
      console.error("Error creating order items:", error);
      throw new Error("Failed to add items to order. Please check your input data.");
    }
  };*/
  










  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;











/*import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";

function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 */