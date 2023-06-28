import React, { useState } from "react";
import "./style.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import SearchIcon from "../../atoms/icons/SearchIcon";
import FilterIcon from "../../atoms/icons/FilterIcon";
import DeleteIcon from "../../atoms/icons/DeleteIcon";

const PopUpBox = ({ products, setFilteredProducts, selectedCategory }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === "") {
      // If search query is empty, set the filtered products to the entire product list
      setFilteredProducts([...products]);
    } else {
      const filteredProductsList = products.filter(
        (product) =>
          (product.category === selectedCategory || selectedCategory === "") && // Filter based on selected category if not empty
          (product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())) // Filter based on title or category
      );
      setFilteredProducts(filteredProductsList);
    }
  };

  return (
    <>
      <Container>
        <div className="popup-content">
          <div className="popup-content-top">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="filter-icon">
              <FilterIcon />
            </div>
            <div className="delete-icon">
              <DeleteIcon />
            </div>
          </div>
          <div className="popup-content-bottom mt-2">
            <p className="mb-0 pt-3">
              <span>ESc</span>to close
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PopUpBox;
