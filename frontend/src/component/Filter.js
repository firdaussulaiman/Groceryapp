import React, { useState } from "react";

const Filter = ({ categories, onSelectCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const applyFilters = () => {
    onSelectCategory(selectedCategories);
  };
  

  return (
    <div>
      <label>Filter by Category:</label>
      {categories.map((category, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`category-${index}`}
            name={`category-${index}`}
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={handleCategoryChange}
          />
          <label htmlFor={`category-${index}`}>{category}</label>
        </div>
      ))}
      <button onClick={applyFilters}>Apply Filters</button>

      {/* Display selected categories */}
      <div>
        <strong>Selected Categories:</strong>
        <ul>
          {selectedCategories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
