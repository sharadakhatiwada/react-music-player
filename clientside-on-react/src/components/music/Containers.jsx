import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MusicList from "./MusicList";
import { Outlet } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { Navbar } from "react-bootstrap";
import CreateNavBar from "./NavBar";
import FooterContent from "./Footer";

export default function Containers() {
  const [addedToFav, setAddedToFav] = useState();
  return (
    <>
      <Container>
        <Row>
          <Col style={{ width: "70%" }}>
            <MusicList setAddedToFav={setAddedToFav} />
          </Col>
        </Row>
      </Container>

      <FooterContent />
    </>
  );
}
