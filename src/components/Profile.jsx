import React from "react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import NavBar from "./NavBar";
import { Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import DefaultProfileIcon from "../profile.svg";
import Card from "react-bootstrap/Card";

const Profile = (props) => {
  return (
    <>
      <NavBar />
      <Container className="welcome-margin">
        <Card style={{ width: "13rem" }}>
          <Card.Img variant="top" src={DefaultProfileIcon} roundedCircle />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.role}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
