import { Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../App.css";

const NavBar = () => {
  return (
    <Container>
      <Row className="welcome-margin">
        <Col>
          <Link to="/" className="link-decoration-none">
            <div className="navbar-button">Przeglądaj pliczki</div>
          </Link>
        </Col>
        <Col>
          <Link to="/profile" className="link-decoration-none">
            <div className="navbar-button">Profil</div>
          </Link>
        </Col>
        <Col>
          <Link to="/chat" className="link-decoration-none">
            <div className="navbar-button">Czat domowy</div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
