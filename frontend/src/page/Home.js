import React, { useState } from "react";


import ProductList from "../component/ProductList";
import Filter from "../component/Filter";

const Home = () => {
  // Define your categories here
  const categories = [
    "Fruits",
    "Rice, Noodles & Cooking Ingredients",
    "Vegetables",
    "Dairy, Chilled & Eggs",
    "Paper & Tissue",
    "Household",
    "Drinks",
    "Beer,Wine & Sprits",
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
    

        {/* Pass categories and onSelectCategory to the Filter component */}
        <Filter categories={categories} onSelectCategory={handleCategorySelect} />
        {/* Pass the selected category to the ProductList component */}
        <ProductList selectedCategory={selectedCategory} />
    
    </div>
  );
};

export default Home;
