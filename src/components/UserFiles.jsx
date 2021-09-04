import React from "react";
import reactDom from "react-dom";
import NavBar from "./NavBar";
import { Row, Card, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import EditFile from "./EditFile";

class UserFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      errorMessage: "",
      isEditing: false,
      editComponent: null,
    };
  }

  componentDidMount() {
    this.GetUserFiles();
  }

  GetUserFiles() {
    fetch("https://localhost:5001/api/file/userFiles", {
      credentials: "include",
    })
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

  handleDelete(id) {
    fetch(`https://localhost:5001/api/file/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 204) {
          this.GetUserFiles();
        } else if (response.status === 403) {
          const data = await response.text();
          throw new Error(data);
        } else throw new Error("Coś poszło nie tak");
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }

  async handleEdit(id, name, description) {
    await this.setState({
      editComponent: <EditFile id={id} name={name} description={description} />,
    });
    this.setState({ isEditing: true });
  }

  renderEditingForm() {
    return this.state.editComponent;
  }

  render() {
    return (
      <>
        <NavBar />
        {!this.state.isEditing ? (
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
                      onClick={() =>
                        this.handleDownload(file.id, file.fileName)
                      }
                      variant="secondary"
                    >
                      Pobierz
                    </Button>
                    <Button
                      className="ml"
                      onClick={() =>
                        this.handleEdit(file.id, file.name, file.description)
                      }
                      variant="success"
                    >
                      Edytuj
                    </Button>
                    <Button
                      className="ml"
                      onClick={() => this.handleDelete(file.id)}
                      variant="danger"
                    >
                      Usuń
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            ))}
            <div className="error-message welcome-margin big-margin">
              {this.state.errorMessage}
            </div>
          </Container>
        ) : (
          this.renderEditingForm()
        )}
      </>
    );
  }
}

export default UserFiles;
