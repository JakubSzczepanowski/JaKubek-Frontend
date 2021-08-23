import React from "react";
import { Link } from "react-router-dom";
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
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
          </Col>
          <Col md="6">
            <ButtonToolbar className="mt-4 me-2 float-end">
              <ButtonGroup className="me-2">
                <Link to="/register">
                  <Button variant="outline-secondary">Zarejestruj się</Button>
                </Link>
              </ButtonGroup>
              <ButtonGroup>
                <Link to="/login">
                  <Button variant="primary">Zaloguj się</Button>
                </Link>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
      </header>
    </Container>
  );
};

export default HeaderBar;
