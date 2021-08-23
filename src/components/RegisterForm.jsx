import React from "react";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const RegisterForm = () => {
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
      <h1>Zarejestruj się za darmo</h1>
      <br />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control
            required
            type="text"
            maxLength={30}
            placeholder="Wpisz swoją nazwę użytkownika"
          />
          <Form.Control.Feedback type="invalid">
            Proszę wpisać nazwę użytkownika
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            required
            type="password"
            maxLength={50}
            placeholder="Wpisz swoje hasło"
          />
          <Form.Control.Feedback type="invalid">
            Proszę wpisać swoje hasło
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check>
            <Form.Check.Input required />
            <Form.Check.Label>
              Akceptuję nieistniejący regulamin
            </Form.Check.Label>
            <Form.Control.Feedback type="invalid">
              Musisz zaakceptować regulamin nawet jeżeli nie istnieje
            </Form.Control.Feedback>
          </Form.Check>
        </Form.Group>
        <Button variant="primary" type="submit">
          Zarejestruj się
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
