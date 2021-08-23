import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useState } from "react";
import FloatingLabel from "react-bootstrap-floating-label";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const LoginForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container className="better-form">
      <h1>Zaloguj się</h1>
      <br />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <div class="form-floating mb-3">
            <input
              required
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Login"
              maxLength={30}
            />
            <div class="invalid-feedback">Proszę wpisać swój login</div>
            <label for="floatingInput">Login</label>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div class="form-floating">
            <input
              required
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              maxLength={50}
            />
            <div class="invalid-feedback">Proszę wpisać swoje hasło</div>
            <label for="floatingPassword">Hasło</label>
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Zaloguj się
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
