import React from 'react';
import ProductCard from './ProductCard';
import groceryData from './grocery.json';

const ProductList = ({ selectedCategory }) => {
  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? groceryData.filter(product => product.category === selectedCategory)
    : groceryData;

  return (
    <div className="justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 shadow-lg  overflow-scroll scrollbar-none">
      {filteredProducts.map((product, index) => (
        <ProductCard
          key={index}
          name={product.name}
          price={product.price}
          image={product.image}
          spec={product.spec}
          category={product.category}
          description={product.description}
        />
      ))}
    </div>
  );
}

export default ProductList;
