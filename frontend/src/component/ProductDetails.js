import React from 'react';
import { useParams } from 'react-router-dom';
import groceryData from './grocery.json';

const ProductDetails = () => {
	const { productID } = useParams(); // Get the 'id' parameter from the URL
  
	// Retrieve the product details based on the 'id'
	const product = groceryData[id];
  
	if (!product) {
	  return <div>Product not found</div>;
	}
  
	return (
	  <div className="product-details">
		<h2>{product.name}</h2>
		<img src={product.image} alt={product.name} />
		<p>Price: ${product.price.toFixed(2)}</p>
		<p>Specification: {product.spec}</p>
		<p>Category: {product.category}</p>
		<p>Description: {product.description}</p>
	  </div>
	);
  };
  

export default ProductDetails;
