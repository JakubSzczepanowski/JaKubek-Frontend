import React from "react";
import reactDom from "react-dom";
import { Row, Card, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class FilesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [], errorMessage: "" };
  }

  componentDidMount() {
    this.GetFiles();
  }

  GetFiles() {
    fetch("https://localhost:5001/api/file", { credentials: "include" })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 400) {
          const data = await response.text();
          throw new Error(data);
        }
        throw new Error("Coś poszło nie tak");
      })
      .then((data) => this.setState({ files: data }))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }

  handleDownload(id, name) {
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    fetch(`https://localhost:5001/api/file/${id}`, {
      credentials: "include",
    })
      .then((response) => response.blob())
      .then((data) => {
        let objectUrl = window.URL.createObjectURL(data);

        anchor.href = objectUrl;
        anchor.download = name;
        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
      });
  }

  render() {
    return (
      <Container>
        {this.state.files.map((file) => (
          <Row key={file.id} className="welcome-margin card-styling">
            <Card style={{ width: "80%" }}>
              <Card.Body>
                <Card.Title>{file.name}</Card.Title>
                <Card.Header>{file.fileName}</Card.Header>
                <Card.Text style={{ marginTop: "10px" }} className="mb-10">
                  {file.description}
                </Card.Text>
                <Button
                  onClick={() => this.handleDownload(file.id, file.fileName)}
                  variant="secondary"
                >
                  Pobierz
                </Button>
              </Card.Body>
            </Card>
          </Row>
        ))}
      </Container>
    );
  }
}

export default FilesList;
