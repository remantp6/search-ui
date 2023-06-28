import React from "react";
import "./style.css";

const CategoryDropdown = ({
  selectedCategory,
  categories,
  handleCategoryChange,
}) => {
  return (
    <>
      <div className="category-dropdown me-2">
        <select
          className="select-field"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CategoryDropdown;
