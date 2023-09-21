import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Define the URL of your server
    const serverUrl = process.env.REACT_APP_SERVER_DOMAIN || 'http://localhost:5000';
    const apiUrl = `${serverUrl}/products`;

    // Make an HTTP GET request to fetch product data
    axios
      .get(apiUrl)
      .then(response => {
        setProducts(response.data.allProducts); // Use allProducts property
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className="justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 shadow-lg  overflow-scroll scrollbar-none">
      {Array.isArray(filteredProducts) ? (
        filteredProducts.map((product) => (
          // Use the ProductCard component to display each product
          <ProductCard
            key={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            spec={product.spec}
            category={product.category}
          />
        ))
      ) : (
        // Handle the case when filteredProducts is not an array
        <p>No products available.</p>
      )}
    </div>
  );
}

export default ProductList;
