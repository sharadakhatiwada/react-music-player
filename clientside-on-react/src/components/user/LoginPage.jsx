import React from "react";
import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.setUserInfo = this.setUserInfo.bind(this);
  }
  state = {
    userInfo: {
      email: "",
      password: "",
    },
    errors: {},
  };

  validateEmail(email) {
    return regex.test(email);
  }

  setUserInfo(value, property) {
    if (property === "email") {
      let result = this.validateEmail(value);
      if (!result) {
        const copyState = { ...this.state };
        copyState.errors["email"] = "Invalid Email address";
        this.setState(copyState);
      } else {
        const copyState = { ...this.state };
        delete copyState.errors["email"];
        this.setState(copyState);
      }
    }
    const copyUserInfo = { ...this.state };
    copyUserInfo.userInfo[property] = value;
    this.setState(copyUserInfo);
  }
  submitUser() {
    if (Object.keys(this.state.errors).length > 0) {
      alert("Please Fill Form Properly!");
    } else {
      axios
        .post(
          "http://localhost:8080/api/auth/login",
          {
            email: this.state.userInfo.email,
            password: this.state.userInfo.password,
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          window.localStorage.setItem("token", res.data.accessToken);
          window.location.href = "/musicList";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }

  render() {
    return (
      <>
        <div>
          <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <div className="border border-3 border-primary"></div>
                <Card className="shadow">
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2 text-uppercase ">
                        Music Playlist
                      </h2>
                      <p className=" mb-5">
                        Please enter your email and password!
                      </p>
                      <div className="mb-3">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="text-center">
                              Email address
                            </Form.Label>
                            <Form.Control
                              required
                              type="email"
                              value={this.state.userInfo.email}
                              placeholder="Enter email"
                              onChange={(e) =>
                                this.setUserInfo(e.target.value, "email")
                              }
                            />
                            <span style={{ color: "red" }}>
                              {this.state.errors.email}
                            </span>
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              required
                              type="password"
                              value={this.state.userInfo.password}
                              placeholder="Password"
                              onChange={(e) =>
                                this.setUserInfo(e.target.value, "password")
                              }
                            />
                          </Form.Group>

                          <div className="d-grid">
                            <Button
                              variant="primary"
                              type="submit"
                              onClick={(e) => {
                                e.preventDefault();
                                this.submitUser();
                              }}
                            >
                              Login
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
