import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const LoginForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      fetch("https://localhost:5001/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      })
        .then(async (response) => {
          if (response.ok) {
            props.setIsAuthenticated(true);
          } else {
            if (response.status === 400) {
              const data = await response.text();
              throw new Error(data);
            }
            throw new Error("Coś poszło nie tak");
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
    setIsLoading(false);
    setValidated(true);
  };

  return (
    <Container className="better-form">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Zaloguj się</h1>
          <br />
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicLogin">
              <div className="form-floating mb-3">
                <input
                  required
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Login"
                  maxLength={30}
                  onChange={(e) => setLogin(e.target.value)}
                />
                <div className="invalid-feedback">Proszę wpisać swój login</div>
                <label htmlFor="floatingInput">Login</label>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div className="form-floating">
                <input
                  required
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  maxLength={50}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="invalid-feedback">
                  Proszę wpisać swoje hasło
                </div>
                <label htmlFor="floatingPassword">Hasło</label>
              </div>
            </Form.Group>
            <div className="error-message">{errorMessage}</div>
            <Button variant="primary" type="submit">
              Zaloguj się
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default LoginForm;
