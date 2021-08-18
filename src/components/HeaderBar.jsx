import React from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logo from "../logo.png";

const HeaderBar = () => {
  return (
    <Container>
      <header>
        <Row className="mt-3">
          <Col md="6">
            <a href="/">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
          </Col>
          <Col md="6">
            <ButtonToolbar className="mt-4 me-2 float-end">
              <ButtonGroup className="me-2">
                <Button variant="outline-secondary">Zarejestruj się</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="primary">Zaloguj się</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
      </header>
    </Container>
  );
};

export default HeaderBar;
