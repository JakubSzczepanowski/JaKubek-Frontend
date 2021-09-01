import React from "react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import NavBar from "./NavBar";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import DefaultProfileIcon from "../profile.svg";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = (props) => {
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [userName, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setFilename(event.target.files[0].name);
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    await setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "jsonString",
      JSON.stringify({
        filename: filename,
        name: userName,
        description: description,
      })
    );
    axios
      .post("https://localhost:5001/api/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(async (response) => {
        setLoading(false);
        if (response.request.status === 200) {
          setSuccessMessage(response.data.message);
        } else {
          if (response.request.status === 400) {
            const data = await response.text();
            throw new Error(data);
          }
          throw new Error("Coś poszło nie tak");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <>
      <NavBar />
      <Container className="welcome-margin">
        <Row>
          <Col lg={2}>
            <Card style={{ width: "13rem" }}>
              <Card.Img variant="top" src={DefaultProfileIcon} roundedCircle />
              <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.role}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={10}>
            <Form onSubmit={handleSubmit}>
              <Card style={{ width: "100%", height: "100%" }}>
                <Card.Body>
                  Wybierz plik, którym chcesz się podzielić
                  <div className="custom-file-input">
                    <label className="custom-file-upload" htmlFor="file-upload">
                      Wybierz plik
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleChange}
                    />
                    <div id="custom-file-filename">{filename}</div>
                  </div>
                </Card.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Nazwij jakoś ten plik
                  </InputGroup.Text>
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Opis (opcjonalne)
                  </InputGroup.Text>
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </InputGroup>
                <div className="error-message">{errorMessage}</div>
                <div className="success-message">{successMessage}</div>
                {file && userName && (
                  <Button
                    variant="primary"
                    disabled={isLoading}
                    onClick={!isLoading ? handleSubmit : null}
                    type="submit"
                  >
                    {isLoading ? "Ładowanie…" : "Wyślij"}
                  </Button>
                )}
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
