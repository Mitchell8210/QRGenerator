import React, { useState } from "react";
import QRCode from "qrcode";

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [qrUrl, setQRUrl] = useState("");
  const generate = () => {
    if (value !== "") {
      QRCode.toDataURL(value)
        .then((url) => {
          setQRUrl(url);
        })
        .catch((err) => {
          setError(err);
          return err;
        });
      setValue("");
    } else {
      setError(true);
    }
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
            <div className="img">
              <img src={qrUrl} width="150px" alt="code" />
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
