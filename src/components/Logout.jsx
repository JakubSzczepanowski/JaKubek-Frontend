import React from "react";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const Logout = ({ setMode, setName, setRole }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("https://localhost:5001/api/account/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 400) {
            const data = await response.text();
            throw new Error(data);
          }
          throw new Error("Coś poszło nie tak");
        }
      })
      .then((data) => {
        setMessage(data.message);
        setName("");
        setRole("");
        setMode(false);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);
  return (
    <Container className="welcome-margin">
      <h1>{message}</h1>
    </Container>
  );
};

export default Logout;
