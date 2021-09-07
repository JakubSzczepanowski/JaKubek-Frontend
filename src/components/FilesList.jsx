import React from "react";
import reactDom from "react-dom";
import {
  Row,
  Col,
  Card,
  Container,
  Button,
  InputGroup,
  Form,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class FilesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      errorMessage: "",
      Query: { searchPhrase: "", pageNumber: 1, pageSize: 5 },
      totalPages: 0,
    };
  }

  componentDidMount() {
    this.GetFiles();
  }

  GetFiles() {
    fetch(
      `https://localhost:5001/api/file?searchPhrase=${this.state.Query.searchPhrase}&pageNumber=${this.state.Query.pageNumber}&pageSize=${this.state.Query.pageSize}`,
      { credentials: "include" }
    )
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
      .then((data) =>
        this.setState({ files: data.items, totalPages: data.totalPages })
      )
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

  handlePageChange = async (newActivePage) => {
    await this.setState({
      Query: { ...this.state.Query, pageNumber: newActivePage },
    });
    this.GetFiles();
  };

  handlePageSizeChange = async (newPageSize) => {
    await this.setState({
      Query: { ...this.state.Query, pageSize: newPageSize },
    });
    this.GetFiles();
  };

  handleSearch = async () => {
    this.GetFiles();
  };

  renderPagination = () => {
    let items = [];
    if (this.state.totalPages <= 5) {
      for (let number = 1; number <= this.state.totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === this.state.Query.pageNumber}
            onClick={() => this.handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      for (let number = 1; number <= 5; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === this.state.Query.pageNumber}
            onClick={() => this.handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
        items.push(<Pagination.Ellipsis disabled />);
        items.push(
          <Pagination.Item
            key={this.state.totalPages}
            active={this.state.Query.pageNumber === this.state.Query.pageNumber}
            onClick={() => this.handlePageChange(this.state.totalPages)}
          >
            {this.state.totalPages}
          </Pagination.Item>
        );
      }
    }
    return items;
  };

  render() {
    return (
      <Container>
        <Row className="search-bar welcome-margin">
          <InputGroup>
            <Form.Control
              placeholder="Wpisz frazę..."
              onChange={(e) =>
                this.setState({
                  Query: { ...this.state.Query, searchPhrase: e.target.value },
                })
              }
            ></Form.Control>
            <Button variant="primary" onClick={this.handleSearch}>
              Szukaj
            </Button>
          </InputGroup>
        </Row>
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
        <Row className="welcome-margin">
          <Col lg={10}>
            <Pagination>{this.renderPagination()}</Pagination>
          </Col>
          <Col lg={2}>
            <Pagination>
              <Pagination.Item
                active={5 === this.state.Query.pageSize}
                onClick={() => this.handlePageSizeChange(5)}
              >
                5
              </Pagination.Item>
              <Pagination.Item
                active={10 === this.state.Query.pageSize}
                onClick={() => this.handlePageSizeChange(10)}
              >
                10
              </Pagination.Item>
              <Pagination.Item
                active={15 === this.state.Query.pageSize}
                onClick={() => this.handlePageSizeChange(15)}
              >
                15
              </Pagination.Item>
            </Pagination>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FilesList;
