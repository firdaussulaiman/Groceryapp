import React, { useState, useEffect } from "react";

const Filter = ({ categories, selectedCategory, onSelectCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Update selectedCategories when selectedCategory prop changes
  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategories([selectedCategory]);
    } else {
      setSelectedCategories([]);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    // Check if the category is already selected, if so, remove it; otherwise, add it.
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);

    // If all categories are selected, set selectedCategory to an empty string, else set it to the first selected category.
    const newSelectedCategory =
      updatedCategories.length === categories.length
        ? ""
        : updatedCategories[0];

    onSelectCategory(newSelectedCategory);
  };

  return (
    <div className="font-semibold">
      <label className="block mb-2">Filter by Category:</label>
      <ul className="list-none pl-0">
        <li className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value=""
              checked={selectedCategories.length === 0}
              onChange={() => handleCategoryChange("")}
              className="mr-2"
            />
            All
          </label>
        </li>
        {categories.map((category, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
