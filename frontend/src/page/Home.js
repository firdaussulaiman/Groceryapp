import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      {/* Add the "to" prop to specify the route */}
      <Link to="/">
        {/* Pass categories and onSelectCategory to the Filter component */}
        <Filter categories={categories} onSelectCategory={handleCategorySelect} />
        {/* Pass the selected category to the ProductList component */}
        <ProductList selectedCategory={selectedCategory} />
      </Link>
    </div>
  );
};

export default Home;
