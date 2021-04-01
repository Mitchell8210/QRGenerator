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
          console.log(url);
          setQRUrl(url);
        })
        .catch((err) => {
          console.error(err);
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
              <img src={qrUrl} width="150px" />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
