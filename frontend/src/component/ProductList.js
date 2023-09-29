import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductDetails from '../page/ProductDetails';

const ProductList = ({ selectedCategory, selectedPriceRange }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Define the URL of your server
    const serverUrl = process.env.REACT_APP_SERVER_DOMAIN || 'http://localhost:5000';
    const apiUrl = `${serverUrl}/products`;

    axios
      .get(apiUrl)
      .then(response => {
        setProducts(response.data.allProducts);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const handleProductClick = productId => {
    setSelectedProduct(productId);
  };

  // Define filteredProducts based on selectedCategory and selectedPriceRange
  const filteredProducts = products.filter(product => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    
    // Define price range comparisons based on selectedPriceRange
    let priceMatch = true;
    if (selectedPriceRange === '<10') {
      priceMatch = product.price < 10;
    } else if (selectedPriceRange === '<20') {
      priceMatch = product.price < 20;
    } else if (selectedPriceRange === '<50') {
      priceMatch = product.price < 50;
    }

    // Return true if both categoryMatch and priceMatch are true
    return categoryMatch && priceMatch;
  });

  return (
    <div className="product-list-container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-0 shadow-lg overflow-scroll scrollbar-none mx-auto">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product._id}
              className="product-item flex justify-center p-0 m-0"
            >
              <Link
                to={`/product/${product._id}`}
                onClick={() => handleProductClick(product._id)}
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
          <p>No products available.</p>
        )}
      </div>
      {selectedProduct && (
        <div>
          <ProductDetails productId={selectedProduct} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
