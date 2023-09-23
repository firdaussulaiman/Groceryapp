import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import ProductCard from '../component/ProductCard';

const ProductDetails = () => {
  const { productId } = useParams(); // Use useParams hook to get productId
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the URL of your server to fetch product details
    const serverUrl = process.env.REACT_APP_SERVER_DOMAIN || 'http://localhost:5000';
    const apiUrl = `${serverUrl}/products/${productId}`;
  
    // Make an HTTP GET request to fetch product details
    axios
      .get(apiUrl)
      .then(response => {
        // Log the response data to check its structure
        console.log('Server Response:', response.data);
  
        // Handle the successful response here
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [productId]);
  // Use productId directly as the dependency

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }
  console.log(product)
  return (
    <div>
        <ProductCard
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          spec={product.spec}
          category={product.category}
        />

    </div>
  );
};

export default ProductDetails;
