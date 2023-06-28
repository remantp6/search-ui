import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import SearchIcon from "../../atoms/icons/SearchIcon";
import SearchButton from "../../atoms/buttons/SearchButton";
import PopUpBox from "./PopUpBox";

const SearchBox = ({ selectedCategory, products, setFilteredProducts }) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const inputRef = useRef();  //declares a ref object using the useRef hook that allows access to DOM elements or React components directly

  const handlePopUp = () => {
    setIsPopUp(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        //e.preventDefault is used to prevent browser's default behavior i.e.
        //press Ctrl+K in a browser, usually triggers the browser's search functionality
        event.preventDefault();
        setIsPopUp(true);
      } else if (event.key === "Escape") {
        setIsPopUp(false);
      }
    };
    //method is used to listen for the "keydown" event and execute the handleKeyDown function.
    document.addEventListener("keydown", handleKeyDown);
   // cleanup function to clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsPopUp(false);
      }
    };
    //this method is used to listen for the "mousedown" event and execute the handleClickOutside function.
    document.addEventListener("mousedown", handleClickOutside);
   // cleanup function to clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="input-container">
        <div className="input-group ms-auto me-auto mt-5">
          <div className="input-group-wrapper">
            <SearchIcon />
            <input type="text" placeholder="Search" onClick={handlePopUp} />
            <SearchButton />
          </div>
        </div>
        {/* ref prop  hold a reference to the input element */}
        <div className="popup-input my-4" ref={inputRef}>
          {isPopUp && (
            <PopUpBox
              products={products}
              setFilteredProducts={setFilteredProducts}
              selectedCategory={selectedCategory}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBox;
