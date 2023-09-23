import React from 'react';

const ProductCard = ({ name, price, image, spec, category, description }) => {
  if (!name || !price || !image || !spec || !category || !description) {
    // Handle the case where any of the props is undefined
    return <p>Product data is incomplete.</p>;
  }

  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
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




