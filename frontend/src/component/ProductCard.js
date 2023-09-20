import React from 'react';

const ProductCard = ({ name, price, image, spec, category, description }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Specification: {spec}</p>
      <p>Category: {category}</p>
      <p>Description: {description}</p>
    </div>
  );
}

export default ProductCard;
