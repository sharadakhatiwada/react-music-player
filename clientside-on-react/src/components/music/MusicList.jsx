import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FavList from "./FavoriteMusicList";
import { FormGroup } from "react-bootstrap";

// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
export default function MusicList({ setAddedToFav }) {
  const [musicList, setMusicList] = useState([]);
  const [favMusic, setFavMusic] = useState([]);
  const [searchTxt, setSearchtxt] = useState("");
  function fetchMusicList() {
    axios
      .get(`http://localhost:8080/api/music?search=${searchTxt}`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const songs = res.data;
        console.log(songs);
        setMusicList(songs);
      });
  }
  function fetchfavMusicList() {
    axios
      .get("http://localhost:8080/api/playlist", {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const favSongs = res.data;
        setFavMusic(favSongs);
      });
  }
  useEffect(() => {
    fetchMusicList();
    fetchfavMusicList();
  }, []);

  function addToFavourite(song) {
    axios
      .post(
        "http://localhost:8080/api/playlist",
        {
          songId: song._id,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setFavMusic(res.data);
      });
  }
  function removeFromFav(song) {
    console.log(song);
    axios
      .delete(`http://localhost:8080/api/playlist/${song.songId}`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setFavMusic(res.data);
      });
  }
  return (
    <Container>
      <Row>
        <Col style={{ width: "70%" }}>
          <h2 style={{ color: "#D291BC" }}>Music List</h2>
          <FormGroup style={{ display: "flex" }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ borderColor: "#FAA0A0" }}
              value={searchTxt}
              onChange={(event) => setSearchtxt(event.target.value)}
            />
            <Button
              style={{
                border: "#FAA0A0",
                backgroundColor: "#FAA0A0",
                color: "black",
                width: "15%",
              }}
              variant="outline-success"
              onClick={() => fetchMusicList()}
            >
              Search
            </Button>
          </FormGroup>
          <Row style={{ backgroundColor: "#D8BFD8", marginTop: "5px" }}>
            <Col md="auto">S. Number</Col>
            <Col>Name</Col>
            <Col xs={6}>Realese date</Col>
            <Col xs lg="2">
              Actions
            </Col>
          </Row>
          {musicList.map((song, index) => {
            return (
              <Row key={index} style={{ backgroundColor: "#F8C8DC" }}>
                <Col xs lg="2">
                  {index + 1}
                </Col>
                <Col>{song.title}</Col>
                <Col>{song.releaseDate}</Col>
                <Col xs lg="2">
                  <Button
                    style={{
                      borderRadius: "2px",
                      borderColor: "#957DAD",
                      backgroundColor: "#E0BBE4",
                    }}
                    onClick={() => addToFavourite(song)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col style={{ width: "30%" }}>
          <FavList favMusic={favMusic} removeFromFav={removeFromFav} />
        </Col>
      </Row>
    </Container>
  );
}
