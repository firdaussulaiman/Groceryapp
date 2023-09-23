import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductDetails from '../page/ProductDetails';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Define setSelectedProduct

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
console.log(products._id)

useEffect(() => {
  products.forEach(product => {
    console.log("_id:", product._id);
  });
}, [products]);

  // Handle product click and set the selected product
  const handleProductClick = productId => {
    setSelectedProduct(productId);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;
    console.log("_id:", selectedProduct); 
  return (
    <div className="justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 shadow-lg overflow-scroll scrollbar-none">
      {Array.isArray(filteredProducts) ? (
  filteredProducts.map(product => (
    <div key={product._id}>
      {/* Use Link to wrap individual elements */}
      <Link
        to={`/product/${product._id}`} // Ensure product._id is passed correctly
        onClick={() => handleProductClick(product._id)} // Handle product click
      >
        <ProductCard
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          spec={product.spec}
          category={product.category}
        />
      </Link>
    </div>
        ))
      ) : (
        // Handle the case when filteredProducts is not an array
        <p>No products available.</p>
      )}
      {selectedProduct && (
        <div>
          {/* Render ProductDetails component when a product is selected */}
          <ProductDetails productId={selectedProduct} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
