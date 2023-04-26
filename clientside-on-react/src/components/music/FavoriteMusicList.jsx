import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlay,
  faSquareCaretLeft,
  faSquareCaretRight,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import FooterContent from "./Footer";

export default function FavList({ favMusic, removeFromFav }) {
  const [currentSong, setCurrentSong] = useState({});
  const [shuffle, setShuffle] = useState(false);
  function toggleShuffle() {
    setShuffle(!shuffle);
  }
  function playNext() {
    if (Object.keys(currentSong).length < 1) {
      return;
    }
    const currentSongIndex = favMusic.findIndex(
      (song) => song._id === currentSong._id
    );
    if (!shuffle) {
      let nextSongIndex =
        currentSongIndex === favMusic.length - 1 ? 0 : currentSongIndex + 1;
      playMusic(favMusic[nextSongIndex]);
    } else {
      playShuffle();
    }
  }
  function playShuffle() {
    let nextSongIndex =
      Math.floor(Math.random() * (favMusic.length - 1 - 0)) + 0;
    playMusic(favMusic[nextSongIndex]);
  }

  function playPrevious() {
    if (Object.keys(currentSong).length < 1) {
      return;
    }
    const currentSongIndex = favMusic.findIndex(
      (song) => song._id === currentSong._id
    );
    if (!shuffle) {
      let nextSongIndex =
        currentSongIndex === 0 ? favMusic.length - 1 : currentSongIndex - 1;
      playMusic(favMusic[nextSongIndex]);
    } else {
      playShuffle();
    }
  }
  const audioControl = useRef();
  function playMusic(song) {
    console.log(song);
    setCurrentSong(song);
  }
  useEffect(() => {
    if (Object.keys(currentSong).length > 0) {
      audioControl.current.load();
      audioControl.current.play();
    }
  }, [currentSong]);
  return (
    <>
      <Container>
        <h2 style={{ color: "#D291BC" }}>My favourites</h2>
        <Row style={{ backgroundColor: "#D8BFD8" }}>
          <Col>S. Number</Col>
          <Col>Name</Col>
          <Col>Actions</Col>
        </Row>
        {favMusic.map((song, index) => {
          return (
            <Row key={index} style={{ backgroundColor: "#F8C8DC" }}>
              <Col
                style={{
                  border: "1px",
                  borderColor: "black",
                  marginTop: "2px",
                }}
              >
                {index + 1}
              </Col>
              <Col
                data-testid={song._id}
                xs={6}
                style={currentSong._id === song._id ? { color: "red" } : {}}
              >
                {song.title}
              </Col>
              <Col
                style={{
                  border: "1px",
                  borderColor: "black",
                  marginTop: "2px",
                }}
              >
                <Button
                  style={{
                    fontWeight: "900",
                    borderRadius: "2px",
                    borderColor: "#957DAD",
                    backgroundColor: "#E0BBE4",
                  }}
                  onClick={() => removeFromFav(song)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <Button
                  onClick={() => playMusic(song)}
                  style={{
                    marginLeft: "3px",
                    fontWeight: "900",
                    borderRadius: "2px",
                    borderColor: "#957DAD",
                    backgroundColor: "#E0BBE4",
                  }}
                >
                  <FontAwesomeIcon icon={faPlay} />
                </Button>
              </Col>
            </Row>
          );
        })}
        <source src="${serverUrl}/${urlPath}" type="audio/mpeg"></source>
        <Row>
          <div
            style={{
              backgroundColor: "#FAA0A0",
              marginTop: "15px",
              padding: "7px",
              width: "fit-content",
            }}
          >
            <audio ref={audioControl} controls>
              {Object.keys(currentSong).length > 0 && (
                <source
                  src={`http://localhost:8080/${currentSong.urlPath}`}
                  type="audio/mpeg"
                ></source>
              )}
            </audio>
          </div>
          <div style={{ padding: "10px" }}>
            <button onClick={() => playPrevious()}>
              <FontAwesomeIcon icon={faSquareCaretLeft} />
            </button>
            <button onClick={() => playNext()}>
              <FontAwesomeIcon icon={faSquareCaretRight} />
            </button>
            <button
              style={
                shuffle
                  ? {
                      marginLeft: "3px",
                      fontWeight: "900",
                      borderRadius: "2px",
                      borderColor: "#957DAD",
                      backgroundColor: "#E0BBE4",
                    }
                  : {}
              }
              onClick={() => toggleShuffle()}
            >
              <FontAwesomeIcon icon={faShuffle} />
            </button>
          </div>
        </Row>
      </Container>
      {currentSong && <FooterContent currentSong={currentSong} />}
    </>
  );
}
