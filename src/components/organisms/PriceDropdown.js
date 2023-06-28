import React from "react";
import "./style.css";

const PriceDropdown = ({ selectedPrice, handlePriceChange }) => {
  return (
    <>
      <select
        className="select-field"
        value={selectedPrice}
        onChange={handlePriceChange}
      >
        <option value="">All Prices</option>
        <option value="65">Less than 65</option>
        <option value="150">Less than 150</option>
        <option value="500">Less than 500</option>
        <option value="1000">Less than 1000</option>
      </select>
    </>
  );
};

export default PriceDropdown;
