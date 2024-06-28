/*import ProductGrid from "../ProductGrid/ProductGrid"
import "./Home.css"

function Home({isFetching, products, addToCart, removeFromCart, searchInputValue, getQuantityOfItemInCart, activeCategory, }) {


import React, { useEffect, useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import axios from "axios";
import "./Home.css";
function Home({
  isFetching,
  products,
  addToCart,
  removeFromCart,
  searchInputValue,
  getQuantityOfItemInCart,
  activeCategory,
}) {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setAllProducts(response.data); // Assuming response.data contains the products array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once, on component mount
  // Filters products by the active category if it is not 'All Categories'.
  const productsByCategory =
    Boolean(activeCategory) && activeCategory !== "All Categories"
      ? products.filter((p) => p.category === activeCategory)
      : products

  // Filters products by the active category if it is not 'All Categories',
  // then further filters the result by the search input value if it is not empty.
  const productsToShow = Boolean(searchInputValue)
    ? productsByCategory.filter((p) => p.name.toLowerCase().indexOf(searchInputValue.toLowerCase()) !== -1)
    : productsByCategory


  return (
    <div className="Home">
      <ProductGrid
        products={productsToShow}
        isFetching={isFetching}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getQuantityOfItemInCart={getQuantityOfItemInCart}
      />
    </div>
  )
}

export default Home;
*/
import React, { useEffect, useState } from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import axios from "axios";
import "./Home.css";
function Home({
  isFetching,
  products,
  addToCart,
  removeFromCart,
  searchInputValue,
  getQuantityOfItemInCart,
  activeCategory,
}) {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setAllProducts(response.data); // Assuming response.data contains the products array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs only once, on component mount
  // Filters products by the active category if it is not 'All Categories'.
  const productsByCategory =
    Boolean(activeCategory) && activeCategory !== "All Categories"
      ? allProducts.filter((p) => p.category === activeCategory)
      : allProducts;
  // Filters products by the active category if it is not 'All Categories',
  // then further filters the result by the search input value if it is not empty.
  const productsToShow = Boolean(searchInputValue)
    ? productsByCategory.filter(
        (p) =>
          p.name.toLowerCase().indexOf(searchInputValue.toLowerCase()) !== -1
      )
    : productsByCategory;
  return (
    <div className="Home">
      <ProductGrid
        products={productsToShow}
        isFetching={isFetching}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getQuantityOfItemInCart={getQuantityOfItemInCart}
      />
    </div>
  );
}
export default Home;