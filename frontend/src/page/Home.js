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
    "Beer,Wine & Spirits",
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex">
      {/* Filter component */}
      <div className="w-1/4 p-4">
        <Filter categories={categories} onSelectCategory={handleCategorySelect} />
      </div>

      {/* ProductList component */}
      <div className="w-3/4 p-4">
        <ProductList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Home;
