import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../component/ProductList';

const ProductDetails = () => {
  const { productId } = useParams();

  // Define a state to store the product data
  const [productsData, setProductsData] = useState([]);

  // Use an effect to fetch and update the product data
  useEffect(() => {
    // Define a function to fetch product data
    const fetchProductData = async () => {
      try {
        // Make an API request to fetch product data based on productId
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        // Update the product data in the state
        setProductsData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    // Call the fetchProductData function
    fetchProductData();
  }, [productId]);

  // Find the product with the specified productId in the productsData
  const product = productsData.find((p) => p._id === productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <ProductList selectedCategory={null} setProductsData={setProductsData} />
      <div className="product-details">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>Price: ${product.price.toFixed(2)}</p>
        <p>Specification: {product.spec}</p>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
