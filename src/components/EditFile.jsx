import React from "react";
import { useState } from "react";
import {
  Row,
  Card,
  Container,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class EditFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      description: props.description,
      errorMessage: "",
      successMessage: "",
      isLoading: false,
    };
  }

  handleSubmit = async () => {
    this.setState({ isLoading: true });
    fetch(`https://localhost:5001/api/file/${this.props.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 400) {
            const data = await response.json();
            throw new Error(data.message);
          }
          throw new Error("Coś poszło nie tak");
        }
      })
      .then((data) => {
        this.setState({
          isLoading: false,
          successMessage: data.message,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  };

  render() {
    return (
      <>
        <Container>
          <Form className="welcome-margin">
            <Card style={{ width: "100%", height: "100%" }}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Wpisz nową nazwę
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                <InputGroup.Text id="inputGroup-sizing-default">
                  Opis (opcjonalne)
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </InputGroup>
              <div className="error-message">{this.state.errorMessage}</div>
              <div className="success-message">{this.state.successMessage}</div>
              {this.state.name && (
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
        </Container>
      </>
    );
  }
}

export default EditFile;
