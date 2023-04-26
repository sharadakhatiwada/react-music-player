import React from "react";
import { Footer } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretLeft,
  faCirclePause,
  faSquareCaretRight,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
export default function FooterContent({ currentSong }) {
  console.log(currentSong, "footer");
  return (
    <>
      <footer className="page-footer font-small blue">
        {currentSong && (
          <span style={{ color: "red" }}>{currentSong.title}</span>
        )}
      </footer>
    </>
  );
}
