import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import { formatPrice } from "../../utils/format";
import "./ProductDetail.css";

function ProductDetail({ addToCart, removeFromCart, getQuantityOfItemInCart }) {
  const { productId } = useParams(); // Fetching productId from URL params
  const [product, setProduct] = useState(null); // State to hold the product data
  const [isFetching, setIsFetching] = useState(false); // State to track if data is being fetched
  const [error, setError] = useState(null); // State to hold error information

  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true); // Set fetching state to true while fetching data
      try {
        // Fetch product data from backend using productId
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        setProduct(response.data); // Update product state with fetched data
        setIsFetching(false); // Set fetching state to false after data is fetched
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error fetching product. Please try again later."); // Handle error state
        setIsFetching(false); // Set fetching state to false on error
      }
    };

    fetchProduct(); // Call fetchProduct function when component mounts
  }, [productId]); // useEffect dependency on productId to fetch new data when productId changes

  // If there's an error, display the NotFound component
  if (error) {
    return <NotFound />;
  }

  // While fetching data or if product is not yet loaded, display a loading message
  if (isFetching || !product) {
    return <h1>Loading...</h1>;
  }

  // Calculate quantity of the product in the cart using the provided function
  const quantity = getQuantityOfItemInCart(product);

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    if (product.id) {
      addToCart(product); // Call addToCart function with the product as parameter
    }
  };

  // Function to handle removing the product from the cart
  const handleRemoveFromCart = () => {
    if (product.id) {
      removeFromCart(product); // Call removeFromCart function with the product as parameter
    }
  };

  // Render the ProductDetail component with fetched product data
  return (
    <div className="ProductDetail">
      <div className="product-card">
        <div className="media">
          <img src={product.image_url || "/placeholder.png"} alt={product.name} />
        </div>
        <div className="product-info">
          <p className="product-name">{product.name}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          <div className="actions">
            <button onClick={handleAddToCart}>Add to Cart</button>
            {quantity > 0 && <button onClick={handleRemoveFromCart}>Remove from Cart</button>}
            {quantity > 0 && <span className="quantity">Quantity: {quantity}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;














/*import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import { formatPrice } from "../../utils/format";
import "./ProductDetail.css";

function ProductDetail({ addToCart, removeFromCart, getQuantityOfItemInCart }) {
  
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);


  if (error) {
    return <NotFound />;
  }

  if (isFetching || !product) {
    return <h1>Loading...</h1>;
  }

  const quantity = getQuantityOfItemInCart(product);

  const handleAddToCart = () => {
    if (product.id) {
      addToCart(product)
    }
  };

  const handleRemoveFromCart = () => {
    if (product.id) {
      removeFromCart(product);
    }
  };

  return (
    <div className="ProductDetail">
      <div className="product-card">
        <div className="media">
          <img src={product.image_url || "/placeholder.png"} alt={product.name} />
        </div>
        <div className="product-info">
          <p className="product-name">{product.name}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          <div className="actions">
            <button onClick={handleAddToCart}>Add to Cart</button>
            {quantity > 0 && <button onClick={handleRemoveFromCart}>Remove from Cart</button>}
            {quantity > 0 && <span className="quantity">Quantity: {quantity}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProductDetail;*/