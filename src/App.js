/* eslint-disable no-unused-vars */
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [dots, setDots] = useState(0);
  let [inputBoard, setInputBoard] = useState(false);
  let [details, setDetails] = useState({
    yourName: "",
    partnerName: "",
  });
  let [lovePercent, setLovePercent] = useState(0);
  let [percentText, setPercentText] = useState(false);
  let [reload, setReload] = useState(true);


  function bounsingDots() {
    setInterval(() => {
      if (dots === 4) {
        setDots(0);
      } else {
        setDots((prevDots) => (prevDots + 1) % 4);
      }
    }, [500]);
  }
  function timedOut() {
    setTimeout(() => {
      setPercentText(true);
    }, 1500);
  }

  function SubmitButton() {
    if (details.yourName === "" || details.partnerName === "") {
      alert("Please Enter the Names");
    } else {
      let letters = `${details.yourName}${details.partnerName}`
        .split("")
        .map((each) => each.charCodeAt(0));
      let sum = letters.reduce((accum, current) => {
        return accum + current;
      });
      let factor = Math.ceil(sum / 100);
      let result = Math.ceil(sum / factor) - 6;
      setLovePercent(result);
      setInputBoard(true);
      bounsingDots();
      timedOut();
    }

    // console.log(result);
  }
  // useEffect(() => {
  //   window.location.reload();
  // }, [reload]);

  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <Container
      fluid
      className="p-0 d-flex flex-column justify-content-center align-items-center">
      <Col
        className="text-light col-12 text-center p-2"
        style={{ backgroundColor: "pink" }}>
        <h4>Love Calculator</h4>
      </Col>
      <Col className="py-4 d-flex flex-column justify-content-center align-items-center">
        <Col className="py-4 col-10 text-center">
          <p>Do you want to know how much your partner loving you?</p>
        </Col>
        <Col className="col-10 input-outer-container">
          <Col className="rotate-stick" />
          <Col className={`input-container ${inputBoard ? "d-none" : ""}`}>
            <Col className="col-12">
              <label>Your Name</label>
            </Col>
            <Col className="col-12">
              <input
                name="yourname"
                value={details.yourName}
                className="col-12"
                onChange={(e) =>
                  setDetails({ ...details, yourName: e.target.value })
                }
                type="text"
              />
            </Col>
            <Col className="col-12">
              <label>Your Partner's</label>
            </Col>
            <Col className="col-12">
              <input
                name="partnername"
                value={details.partnerName}
                onChange={(e) =>
                  setDetails({ ...details, partnerName: e.target.value })
                }
                className="col-12"
                type="text"
              />
            </Col>
            <button className="btn btn-outline-dark" onClick={SubmitButton}>
              Calculate
            </button>
          </Col>
          <Col className={`input-container ${inputBoard ? "" : "d-none"}`}>
            <h1
              className={`${percentText ? "d-none" : ""}`}
              style={{ color: "grey" }}>
              Calculating{`${".".repeat(dots)}`}
            </h1>
            <h1 className={`text-center ${percentText ? "" : "d-none"}`}>
              Your partner has{" "}
              <b style={{ color: "red" }}>{`${lovePercent}`}</b>% love on you
            </h1>
            <button onClick={refreshPage} className="btn btn-outline-dark">
              Back
            </button>
          </Col>
        </Col>
      </Col>
    </Container>
  );
}

export default App;
