import React, { useState } from "react";
import QRCode from "qrcode";
import { useSpring, animated, config } from "react-spring";

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [qrUrl, setQRUrl] = useState("");
  const [googleSearchString, setGoogleSearchString] = useState("");
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    reset: qrUrl !== "",
    config: config.molasses,
  });
  const googlePrefix = "https://www.google.com/search?q=";
  const generate = () => {
    if (value !== "") {
      const query = value.replace(/\s/g, "+");
      setGoogleSearchString(googlePrefix + query);
      QRCode.toDataURL(value)
        .then((url) => {
          setQRUrl(url);
          console.log("url", url);
        })
        .catch((err) => {
          setError(err);
          return err;
        });
    } else {
      setError(true);
    }
  };
  const clear = () => {
    setValue("");
    setQRUrl("");
    setGoogleSearchString("");
    setError("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">QR Generator</div>
        <div className="subTitle">
          This site will let you generate a QR Code
        </div>
        <div className="box">
          {error && <div className="error">Please enter some text</div>}
          <input
            type="text"
            className="input"
            placeholder="ex. www.google.com"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
              setQRUrl("");
            }}
          />
          <button onClick={() => generate()} className="button">
            Submit
          </button>
          {qrUrl && (
            <div>
              <div>Click the QR Code to verify it works!</div>
              <div className="img">
                <animated.div style={props}>
                  <a href={googleSearchString} target="_blank" rel="noreferrer">
                    <img src={qrUrl} width="150px" alt="code" />
                  </a>
                </animated.div>
              </div>
              <button className="reset-button" onClick={() => clear()}>
                Reset
              </button>
            </div>
          )}
        </div>
        <div className="created-by">
          Created by{" "}
          <a
            href="https://mitchell-rhoads-dev.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Mitchell Rhoads
          </a>{" "}
          with the help of an{" "}
          <a
            href="https://www.npmjs.com/package/qrcode"
            rel="noreferrer"
            target="_blank"
          >
            npm package
          </a>
          .
        </div>
        <div className="created-by">
          Check out the{" "}
          <a
            href="https://github.com/Mitchell8210/QRGenerator"
            target="_blank"
            rel="noreferrer"
          >
            GitHub repo
          </a>
          .
        </div>
      </header>
    </div>
  );
}

export default App;
