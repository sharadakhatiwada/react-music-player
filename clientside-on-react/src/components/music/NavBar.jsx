import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function CreateNavBar({ user }) {
  function signOut() {
    window.localStorage.removeItem("token");
    window.location.href = "/sign-in";
  }
  return (
    <Navbar
      style={{ backgroundColor: "#F8C8DC", color: "#770737" }}
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand href="/musicList">
          <FontAwesomeIcon style={{ color: "#770737" }} icon={faMusic} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to={"/musicList"} style={{ color: "#770737" }}>
                Home
              </Link>
            </Nav.Link>
            {user && user.role == "admin" && (
              <Nav.Link>
                <Link to={"/users"} style={{ color: "#770737" }}>
                  Users
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav.Link>
        {user && <span>Welcome {user.name}</span>}
        <Button
          style={{
            border: "#FAA0A0",
            backgroundColor: "#FAA0A0",
            color: "black",
          }}
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </Nav.Link>
    </Navbar>
  );
}

export default CreateNavBar;
