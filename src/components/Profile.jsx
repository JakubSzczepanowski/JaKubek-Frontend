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
import { Link } from "react-router-dom";
import axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      file: null,
      isLoading: false,
      userName: "",
      description: "",
      errorMessage: "",
      successMessage: "",
    };
  }

  handleChange = (event) => {
    if (event.target.files[0]) {
      this.setState({ filename: event.target.files[0].name });
      this.setState({ file: event.target.files[0] });
    }
  };

  handleSubmit = async (event) => {
    await this.setState({ isLoading: true });
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append(
      "jsonString",
      JSON.stringify({
        filename: this.state.filename,
        name: this.state.userName,
        description: this.state.description,
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
        this.setState({ isLoading: false });
        if (response.request.status === 200) {
          this.setState({ successMessage: response.data.message });
        } else {
          if (response.request.status === 400) {
            const data = await response.text();
            throw new Error(data);
          }
          throw new Error("Coś poszło nie tak");
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };

  render() {
    return (
      <>
        <NavBar />
        <Container className="welcome-margin">
          <Row>
            <Col lg={2}>
              <Card style={{ width: "13rem" }}>
                <Card.Img
                  variant="top"
                  src={DefaultProfileIcon}
                  roundedCircle
                />
                <Card.Body>
                  <Card.Title>{this.props.name}</Card.Title>
                  <Card.Text>{this.props.role}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={10}>
              <Form onSubmit={this.handleSubmit}>
                <Card style={{ width: "100%", height: "100%" }}>
                  <Card.Body>
                    Wybierz plik, którym chcesz się podzielić
                    <div className="custom-file-input">
                      <label
                        className="custom-file-upload"
                        htmlFor="file-upload"
                      >
                        Wybierz plik
                      </label>
                      <input
                        type="file"
                        id="file-upload"
                        onChange={this.handleChange}
                      />
                      <div id="custom-file-filename">{this.state.filename}</div>
                    </div>
                  </Card.Body>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                      Nazwij jakoś ten plik
                    </InputGroup.Text>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={(e) =>
                        this.setState({ userName: e.target.value })
                      }
                    />
                    <InputGroup.Text id="inputGroup-sizing-default">
                      Opis (opcjonalne)
                    </InputGroup.Text>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      onChange={(e) =>
                        this.setState({ description: e.target.value })
                      }
                    />
                  </InputGroup>
                  <div className="error-message">{this.state.errorMessage}</div>
                  <div className="success-message">
                    {this.state.successMessage}
                  </div>
                  {this.state.file && this.state.userName && (
                    <Button
                      variant="primary"
                      disabled={this.state.isLoading}
                      onClick={
                        !this.state.isLoading ? this.handleSubmit : undefined
                      }
                    >
                      {this.state.isLoading ? "Ładowanie…" : "Wyślij"}
                    </Button>
                  )}
                </Card>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/myfiles" className="link-decoration-none">
                <div className="navbar-button">Zarządzaj swoimi plikami</div>
              </Link>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
