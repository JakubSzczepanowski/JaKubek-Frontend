import React from "react";
import { useState } from "react";
import ReactDom from "react-dom";
import {
  Carousel,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

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
              <button type="button" class="btn btn-primary btn-lg">
                Dołącz
              </button>
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
