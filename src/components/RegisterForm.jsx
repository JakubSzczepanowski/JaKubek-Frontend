import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const RegisterForm = () => {
  const [validated, setValidated] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Hasła muszą być identyczne");
    } else setConfirmPasswordError("");
  }, [confirmPassword]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || password !== confirmPassword) {
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
            minLength={3}
            maxLength={30}
            placeholder="Wpisz swoją nazwę użytkownika"
            onChange={(e) => setLogin(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Minimalna liczba znaków to 3
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            required
            type="password"
            minLength={6}
            maxLength={50}
            placeholder="Wpisz swoje hasło"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Minimalna liczba znaków dla hasła to 6
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Potwierdź hasło</Form.Label>
          <Form.Control
            required
            type="password"
            minLength={6}
            maxLength={50}
            placeholder="Potwierdź swoje hasło"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Minimalna liczba znaków dla hasła to 6
          </Form.Control.Feedback>
          <div class="error-message">{confirmPasswordError}</div>
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
