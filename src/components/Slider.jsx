import React from "react";
import { useState } from "react";
import ReactDom from "react-dom";
import { Carousel, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link } from "react-router-dom";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <main>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 opacity-75"
            src="slajd2_edit.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <Container id="slider">
              <span id="main-title">Dołącz teraz</span>
              <p>Publikuj swoje pliki i dziel się z innymi</p>
              <Link to="/register">
                <button type="button" className="btn btn-primary btn-lg">
                  Dołącz
                </button>
              </Link>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="slajd.jpg" alt="Second slide" />
        </Carousel.Item>
      </Carousel>
    </main>
  );
};
export default Slider;
