import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchDisplay from "../components/organisms/SearchDisplay";
import SearchBox from "../components/molecules/SearchBox/SearchBox";
import CategoryDropdown from "../components/organisms/CategoryDropdown";
import PriceDropdown from "../components/organisms/PriceDropdown";
import { Container } from "react-bootstrap";

const FilterPage = () => {
  // State declarations using useState hook
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to fetch data from API on component mount
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
      //   maps over the response.data array extracts the category property and
      //  creating Set object from the array of categories allows category with
      //   unique key and convert iterable object to array using
      //  Array.from() method and assigned in to uniqueCategory variable
      const uniqueCategory = Array.from(
        new Set(response.data.map((product) => product.category))
      );
      // update the state of the categories variable with unique category
      setCategories(uniqueCategory);
      setIsLoading(false);
    });
  }, []);

  // Function to handle category change event
  const handleCategoryChange = (event) => {
    //assigning the value of the selected option from category dropdown
    const category = event.target.value;
    setSelectedCategory(category);
    //calling filterProducts function to filter products based on selected category
    filterProducts(category, selectedPrice);
  };

  // Function to handle price change event
  const handlePriceChange = (event) => {
    //assigning the value of the selected option from priceRange dropdown
    const selectedOption = event.target.value;
    setSelectedPrice(selectedOption);
    //calling filterProducts function to filter products based on selected price
    filterProducts(selectedCategory, selectedOption);
  };

  // Function to filter products based on category and price
  const filterProducts = (category, selectedOption) => {
    //initializing a filtered variable with the original products array
    let filtered = products;

    if (category !== "") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (selectedOption !== "") {
      filtered = filtered.filter(
        (product) => product.price < parseFloat(selectedOption) //parseFloat() method converts the selected price option (which is a string) to a floating-point number
      );
    }

    setFilteredProducts(filtered);
  };
  return (
    <>
      <Container>
        <div className="search-ui-content">
          <SearchBox
            selectedCategory={selectedCategory}
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
          <p style={{padding: "20px, 0px", fontSize:"22px"}}>{isLoading ? "Loading..." : null}</p> 
          <div className="dropdown-section d-flex justify-content-end">
            <CategoryDropdown
              selectedCategory={selectedCategory}
              categories={categories}
              handleCategoryChange={handleCategoryChange}
            />
            <PriceDropdown
              selectedPrice={selectedPrice}
              handlePriceChange={handlePriceChange}
            />
          </div>
        </div>
      </Container>
      <SearchDisplay filteredProducts={filteredProducts} />
    </>
  );
};

export default FilterPage;
