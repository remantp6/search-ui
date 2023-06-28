import React from "react";
import "./style.css";
import { Container } from "react-bootstrap";

const SearchDisplay = ({ filteredProducts }) => {
  return (
    <>
      <div className="search-display-content mt-5">
        <Container>
          {filteredProducts.map((product) => (
            <div
              className="py-2 ps-3 d-flex align-items-center item"
              key={product.id}
            >
              <h6 className="mb-0">{product.title}</h6>
              <p className="mb-0 fs-5">
                {" "}
                <i className="bi bi-chevron-right"></i> {product.category}
              </p>
              <p className="mb-0">
                {" "}
                <i className="bi bi-chevron-right"></i> ${product.price}
              </p>
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};

export default SearchDisplay;
